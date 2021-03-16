import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ROUTES} from './menu-items';
import {RouteInfo} from './sidebar.metadata';
import {Router, ActivatedRoute, Routes} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  name;
  public sidebarnavItems: any[];

  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private routes: Router
  ) {
  }

  // End open close
  ngOnInit() {
    this.name = localStorage.getItem('user');
    if (localStorage.getItem('user')) {
      const isAdmin = (localStorage.getItem('role') === 'Admin') ? true : false;
      const isStoreManager = (localStorage.getItem('role') === 'Store Manager') ? true : false;
      console.log(isStoreManager);
      if (!isAdmin && !isStoreManager) {

        ROUTES.forEach((element, index) => {
          if (element.title === 'Logout') {
            ROUTES.splice(index, 1);
          }
        });
        ROUTES.forEach((element, index) => {
          if (element.title === 'Profile') {
            ROUTES.splice(index, 1);
          }
        });
      }
      if (isAdmin) {
        ROUTES.forEach((element, index) => {
          if (element.title === 'Home') {
            ROUTES.splice(index, 1);
          }
        });
        ROUTES.forEach((element, index) => {
          if (element.title === 'Login') {
            ROUTES.splice(index, 1);
          }
        });
        ROUTES.forEach((element, index) => {
          if (element.title === 'Gallery') {
            ROUTES.splice(index, 1);
          }
        });
      }
      if (isStoreManager) {
        ROUTES.forEach((element, index) => {
          if (element.title === 'Login') {
            ROUTES.splice(index, 1);
          }
        });
      }

      this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    } else {
      this.routes.navigate(['/search']);
    }
  }
}
