import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import {LoginService} from '../services/login.service';
import {UserDetails} from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(private loginService: LoginService, private routes: Router) { }

  ngOnInit() {
  }
  check(uname: string, password: string) {
    this.loginService.login(uname, password).subscribe((user: UserDetails) => {
      if (user) {
        localStorage.setItem('userID', user.id);
        localStorage.setItem('username', user.name);
        localStorage.setItem('storeID', user.storeID);
        console.log('Local storage - ' + localStorage.getItem('username'));
        console.log('Local storage - ' + localStorage.getItem('storeID'));
        this.routes.navigate(['/product']);
      } else {
        this.msg = 'Invalid Username or Password';
      }}
    );

  }

  loginform = true;
  recoverform = false;

  changeForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  searchForm() {
    this.routes.navigate(['/search']);
  }
}
