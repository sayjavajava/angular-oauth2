

import {BadRequest} from '../../common/BadRequest';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../../common/AppError';
import { UserService } from '../../services/user.service';
import { UserUtil } from '../../common/UserUtil';
import { Router } from '@angular/router';
import { MatDialog, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { Loading } from '../../common/Loading';
import { DataSource } from '@angular/cdk/table';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  displayedColumns = ['Name','age','salary','Edit','Delete'];
  isLoading:boolean;
  userslist:UserUtil[]=[];
  value: any[];
  static urlarray;

  pageEvent: PageEvent;
  pageIndex:number;
  pageSize:number;
  length:number;
  
  dataSource = new UserDataSource(this.userservice,0,5);
  public getServerData(event?:PageEvent){console.log(event.pageSize)
  
    this.dataSource = new UserDataSource(this.userservice,0,event.pageSize);
  }
 constructor(private userservice :UserService,private router:Router,private matdialog:MatDialog) { 
    let flagobj=new Loading();
    this.isLoading=flagobj.isLoading;
    UserComponent .urlarray =true;
    console.log(flagobj.isLoading);
 }

 get staticUrlArray():boolean {
   return UserComponent.urlarray;
     }
 myEvent(event) {
   console.log(event);
     }

delete(user){
    if(user.id){
   this.userservice.DeleteUser(user.id).subscribe(data=>console.log(data));
   this.router.navigate(['/home']);
   }
}
openDialog(){
let dialogRef = this.matdialog.open(UpdateUserComponent, {
  height: '460px',
  width: '500px'
});}

editUserPage(user: UserUtil) {
 if (user) {
//this.matdialog.open(UpdateRoleComponent,{data:user.id});
 //  this.router.navigate(['/user/edit', user.id]);
  }
}

closeDialog(){
 this.matdialog.closeAll();
}
ngOnInit() {
  this.pageEvent = new PageEvent;
  this.pageEvent.pageIndex = 0;
 UserComponent.urlarray=false;
}

}

export class UserDataSource extends DataSource<any> {
  constructor(private userservice: UserService,private pageindex:number,private size:number) {
   super();

 }
 connect(): Observable<UserUtil[]> {
 
  const flagobj =new Loading();

  flagobj.isLoading=false;
 
  console.log(flagobj.isLoading); 

  return this.userservice.findAllUsers(this.pageindex,this.size);
           }
 disconnect() {}

}
