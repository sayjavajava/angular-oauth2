import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  ngOnInit() {
  }

  user = {
    username: '',
    password: ''
  };
 constructor(private auth: AuthService, private router: Router) { }

 
 
 login(usercreds) {
    this.auth.login(usercreds);
 }
}



