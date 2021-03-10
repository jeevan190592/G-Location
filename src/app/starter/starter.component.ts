import { Component, AfterViewInit } from '@angular/core';
@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'Product Details';
  }

  ngAfterViewInit() {}

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('username');
  }
}
