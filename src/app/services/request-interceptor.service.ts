import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { AuthService } from "./auth.service";
import { UserToken } from "../common/UserToken";

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    refresh_token: string;
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authService: AuthService, private httpclient: HttpClient) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        console.log('inter:token adding' + token);
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })

    }

    refreshToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        console.log('inter:token refreshing' + token);
        const headers = new HttpHeaders({
            'Authorization': "Basic " + btoa("waqas:waqas-secret"),
            'Content-Type': 'application/x-www-form-urlencoded',
            'grant_type': 'refresh_token',
            'refresh_token': token
        });


        return req.clone({ headers });
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        console.log('I am intercept');
        if (req.headers.has('Content-Type')) {

            console.log('headersupper:' + req.headers.get('Authorization'));


            return next.handle(req);
        } else {
            console.log('i am else:inter');
            const access_token = this.authService.getAuthToken();
            console.log('inter-token' + access_token);
            return next.handle(this.addToken(req, access_token))
                //   console.log('inter-token' + this.authService.getAuthToken());
                .catch(error => {
                    if (error instanceof HttpErrorResponse) {
                        console.log('I am intercept2');
                        switch ((<HttpErrorResponse>error).status) {
                            case 400:
                                return this.handle400Error(error);
                            case 401:
                                console.log('I am 401');
                                return this.handle401Error(req, next);
                        }
                    } else {
                        return Observable.throw(error);
                    }
                });

        }
        
    }


    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser();
        }

        return Observable.throw(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            console.log('I am handler 401');
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return this.authService.refreshToken()
                .switchMap((newToken: string) => {
                    console.log('map token' + newToken);
                    if (newToken) {
                        this.tokenSubject.next(newToken);


                        //    const  clonedreq =req.clone({headers});

                        return next.handle(this.addToken(req, newToken));

                    }

                    // If we don't get a new token, we are in trouble so logout.
                    return this.logoutUser();
                })
                .catch(error => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    console.log('bad news its catch');
                    return this.logoutUser();
                })
                .finally(() => {
                    this.isRefreshingToken = false;
                });
        } else {
            return this.tokenSubject
                .filter(token => token != null)
                .take(1)
                .switchMap(token => {
                    console.log('i am switch map else ');
                    return next.handle(this.addToken(req, token));
                });
        }
    }


    logoutUser() {
        // Route to the login page (implementation up to you)
        console.log("logout");
        return Observable.throw("");
    }
}
