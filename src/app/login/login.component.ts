import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(private service: MyserviceService, private routes: Router) { }

  ngOnInit() {
  }
  check(uname: string, p: string) {
    const output = this.service.checkusernameandpassword(uname, p);
    if (output === true) {
      this.routes.navigate(['/starter']);
    } else {
      this.msg = 'Invalid Username or Password';
    }
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
