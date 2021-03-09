import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import {LoginServiceService} from "../services/login-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(private service: MyserviceService, private loginService: LoginServiceService, private routes: Router) { }

  ngOnInit() {
  }
  check(uname: string, password: string) {
    this.loginService.login(uname, password).subscribe((res) => {
      if (res) {
        this.routes.navigate(['/starter']);
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
