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
  isAdmin
  constructor(private loginService: LoginService, private routes: Router) { }

  ngOnInit() {
    localStorage.removeItem('userID');
    localStorage.removeItem('storeID');
  }
  check(uname: string, password: string) {
    this.loginService.login(uname, password).subscribe((user: UserDetails) => {
      if (user) {
        localStorage.setItem('userName', user.username);
        localStorage.setItem('user', user.name);
        localStorage.setItem('userID', user.id);
        localStorage.setItem('email', user.email);
        localStorage.setItem('phoneno', user.phoneno);
        localStorage.setItem('storeID', user.store);
        localStorage.setItem('role', user.role);
        localStorage.setItem('password', user.password);
        this.isAdmin = (user.role = 'Admin') ? true : false
        localStorage.setItem('isAdmin', this.isAdmin, );
        console.log('Local storage - ' + localStorage.getItem('user'));
        console.log('Local storage - ' + localStorage.getItem('storeID'));
        if (this.isAdmin) {
          this.routes.navigate(['/profile']);
        } else {
          this.routes.navigate(['/product']);

        }
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
