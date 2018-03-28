import { Authority } from "./Authority";

export class UserUtil{
    

    id:number;
    username:string;
    age:string;
    email:string;
    enabled:boolean;
    authority2:any;
    auth:string; 
    authorities:object[]  
    authority:Authority[];
    changerole:number;
    slary:number;
    

    constructor( id:number,username: string, email: string, enabled: boolean,changerole:number){
       this.id=id;
        this.username = username;
        this.email = email;
        this.enabled = enabled;
        this.changerole=changerole;
      }

}