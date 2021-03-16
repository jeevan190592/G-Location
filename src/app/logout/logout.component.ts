import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routes: Router) {
  }

  ngOnInit(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('userID');
    localStorage.removeItem('storeID');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('phoneno');
    localStorage.removeItem('role');
    localStorage.removeItem('password');
    this.routes.navigate(['/search']);
  }

}
