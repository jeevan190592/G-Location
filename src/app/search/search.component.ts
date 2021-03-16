import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {StoreDetails} from '../models';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './search.component.html',
  providers: [MyserviceService]
})
export class SearchComponent implements OnInit {
  msg = '';
  stores: StoreDetails[];
  constructor(private userService: UserService, private routes: Router) { }

  ngOnInit() {
    localStorage.removeItem('userID');
    localStorage.removeItem('storeID');
    this.getStores();
  }
  check(StoreName: string) {
    if (StoreName) {
      const storeID = this.stores.find(x => x.name === StoreName).id;
      localStorage.setItem('storeID', storeID);
      localStorage.setItem('storeName', StoreName);
      this.routes.navigate(['/product']);
    } else {
      this.msg = 'Please enter store name to search';
    }
  }

  getStores() {
    this.userService.getAllStores().subscribe((stores) => {
      if (stores) {
        this.stores = stores;
      }
    });
  }

  storeNameSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => (term.length < 0 ? [] : this.stores.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))
      // tslint:disable-next-line:semicolon
    );
  formatter = (x: { name: string }) => x.name;

}
