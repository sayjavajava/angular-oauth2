import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operator/map';
import { UserToken } from '../common/UserToken';
import { BehaviorSubject, Subject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    private authUrl: string = '/api/oauth/token';
    public authTokenStale: string = 'stale_auth_token';
    // public authTokenNew: string = 'new_auth_token';
    public currentToken: string;


    tokenarr: UserToken[] = [];
    access_token: string;
    refresh_token: string;

    constructor(private httplclient: HttpClient,private router:Router) {
        this.currentToken = this.authTokenStale;
    }

    getAuthToken() {
        const token = localStorage.getItem("access_token");
        if (token) {

            return token;
        } else
            return null;
    }

    refreshToken(): Observable<string> {

        const token_refreshed = localStorage.getItem("refresh_token");
        //this.currentToken = this.authTokenNew;
        let new_token: string;
        const tokenObsr = new Subject<string>();
        if (token_refreshed) {
            console.log("this refreshed token" + token_refreshed);

            const headers = new HttpHeaders({
                'Authorization': "Basic " + btoa("waqas:waqas-secret"),
                'Content-Type': 'application/x-www-form-urlencoded',
                'grant_type': 'refresh_token',
                'refresh_token': token_refreshed
            });
            var creds = "grant_type=refresh_token" + "&credentials=true" + "&refresh_token=" + token_refreshed;

            this.httplclient.post<UserToken>('/api/oauth/token', creds, { headers: headers })
                .subscribe(response => {
                    console.log('new token_after_ref' + response.access_token);
                    // this.access_token = response.access_token;
                    console.log('expires_in:' + response.expires_in)

                    localStorage.setItem('access_token', response.access_token);
                    //     localStorage.setItem('refresh_token', this.refresh_token);
                   // new_token = response.access_token;
                   tokenObsr.next(response.access_token);
                   //    return Observable.of(new_token).delay(200);
                }, err => {
                    console.log("User authentication failed!");
                });
        }
        console.log('i am returning');
       // return Observable.of(tokenObsr);
    return tokenObsr.asObservable();
    }
    login(usercreds) {

        console.log(usercreds);

        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Basic " + btoa("waqas:waqas-secret"));
        headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        // headers = headers.append("Authorization", "Basic d2FxYXM6d2FxYXMtc2VjcmV0");

        var creds = 'username=' + usercreds.username + '&password=' + usercreds.password + "&grant_type=password" + "&credentials=true";

        this.httplclient.post<UserToken>('/api/oauth/token', creds, { headers: headers })
            .subscribe(response => {
                console.log('new token' + response.access_token);
                // this.access_token = response.access_token;
                console.log('expires_in:' + response.expires_in)
                this.refresh_token = response.refresh_token;
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', this.refresh_token);

            }, err => {
                console.log("User authentication failed!");
            });
    }

    logout(){
        const token = localStorage.getItem("access_token");
        if(token){
          this.httplclient.get('/api/exit',{observe:'response'}).subscribe(
           (res=>{if(res.status==200){
               localStorage.removeItem("access_token");
               localStorage.removeItem("refresh_token");
               this.router.navigate(['productadd']);
           }})
        );
        }
        
    }

}




