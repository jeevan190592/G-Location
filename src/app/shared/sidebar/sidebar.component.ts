import {Component, OnInit} from '@angular/core';
import {AdminRoutes, SearchRoutes, StoreManagerRoutes} from './menu-items';
import {Router} from '@angular/router';
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
  showProfile = true;
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
    if (localStorage.getItem('storeID')) {
      if (localStorage.getItem('role')) {

        switch (localStorage.getItem('role')) {
          case 'Admin':
            this.sidebarnavItems = AdminRoutes.filter(sidebarnavItem => sidebarnavItem);
            break;
          case 'Store Manager':
            this.sidebarnavItems = StoreManagerRoutes.filter(sidebarnavItem => sidebarnavItem);
            break;
          default:
            this.sidebarnavItems = SearchRoutes.filter(sidebarnavItem => sidebarnavItem);
            break;
        }
      } else {
        this.showProfile = false;
        this.sidebarnavItems = SearchRoutes.filter(sidebarnavItem => sidebarnavItem);
      }
    } else {
      this.routes.navigate(['/search']);
    }
  }
}
