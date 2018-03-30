import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BadRequest } from '../common/BadRequest';
import { NotFound } from '../common/NotFound';
import { AppError } from '../common/AppError';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserUtil } from '../common/UserUtil';
import { User } from '../common/User';

@Injectable()
export class UserService {
  private userURL:'api/users';
  constructor(private httpclient :HttpClient) { }

  RegisterNewUser(resource:User){
    
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    };
    
 console.log('in service'+resource.address.city);
return this.httpclient.post<User[]>('api/user', resource,{observe:'response'});
}

findAllUsers(pageindex:number,sz:number): Observable<UserUtil[]>{
  let pagestart:number=pageindex;
  let size:number=sz;
 
let headers = new HttpHeaders();
return this.httpclient.get<UserUtil[]>('api/users'+'?'+'page='+pagestart+'&'+'size='+size)
 .map((data: any) => {
   return data._embedded.users;
 })


 // return this.httpclient.get<UserUtil[]>('api/user');
}

DeleteUser(user:UserUtil){
return this.httpclient.delete(this.userURL + "/" + user.id)
}

  private handleError(error:Response){
    if (error.status === 400){
       return Observable.throw(new BadRequest());
        }
        if (error.status === 404){
         return  Observable.throw(new NotFound());
        }else
      return  Observable.throw(new AppError(error)); }
}
