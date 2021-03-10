import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import {LoginServiceService} from "../services/login-service.service";
import {userDetails} from "../models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(private loginService: LoginServiceService, private routes: Router) { }

  ngOnInit() {
  }
  check(uname: string, password: string) {
    this.loginService.login(uname, password).subscribe((res: userDetails) => {
      if (res) {
        localStorage.setItem('username', res.name);
        console.log('Local storage - ' + localStorage.getItem('username'));
        this.routes.navigate(['/starter']);
      } else {
        this.msg = 'Invalid Username or Password';
      }}
    )

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
