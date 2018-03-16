import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class AuthService {

 private authUrl : string = '/api/oauth/token';
  public authTokenStale: string = 'stale_auth_token';
  public authTokenNew: string = 'new_auth_token';
  public currentToken: string;
  private  clientId='waqas';
  private clientSecret:'waqas-secret';
  constructor(private httplclient:HttpClient) {
      this.currentToken = this.authTokenStale;
  }

  getAuthToken() {
        
      return this.currentToken;
  }

  refreshToken(): Observable<string> {
     

      this.currentToken = this.authTokenNew;

      return Observable.of(this.authTokenNew).delay(200);
  }
  login(usercreds){
    
    console.log(usercreds);
  
 
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("waqas:waqas-secret"));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
   // headers = headers.append("Authorization", "Basic d2FxYXM6d2FxYXMtc2VjcmV0");
 
     var creds = 'usernamename=' + usercreds.username + '&password=' + usercreds.password + "&grant_type=password"+ "&credentials=true" ;

    this.httplclient.post('/api/oauth/token',creds, {headers: headers}).subscribe(response => {
          console.log(response);
    }, err => {
       console.log("User authentication failed!");
    });
 }
          
  }



