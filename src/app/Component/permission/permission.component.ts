import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Authority } from '../../common/Authority';
import { Observable } from 'rxjs/Observable';
import { Persmission } from '../../common/Permission';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  constructor(private userservice:UserService) { }
  roles :Authority[];
  AllPermission:Persmission[] ;
  ngOnInit() {
  this.userservice.findAllRoles().subscribe(res=>this.roles=res);
 this.userservice.findAllPermissions().subscribe(res=>this.AllPermission=res);
  }
  permssion = {
    name: '',
    description: ''
  };

  role = {
    name: '',
    description: ''
  };
  submitPermission(permissin){
   
      this.userservice.AddPermission(permissin).subscribe(res=>console.log(res));
   }
  
   
   submitRole(role){
      this.userservice.AddRoles(role).subscribe(res=>console.log(res));
    }
  }

