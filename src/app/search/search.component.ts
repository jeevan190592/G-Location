import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './search.component.html',
  providers: [MyserviceService]
})
export class SearchComponent implements OnInit {
  msg = '';
  constructor(private service: MyserviceService, private routes: Router) { }

  ngOnInit() {
  }
  check(uname: string) {
    if (uname) {
      this.routes.navigate(['/starter']);
    } else {
      this.msg = 'Please enter something to search';
    }
  }

}
