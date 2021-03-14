import {Component, OnInit} from '@angular/core';
import {StoreDetails, UserDetails} from '../models';
import {ProductService} from '../services/product.service';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: UserDetails
  store: StoreDetails
  message = '';
  failMessage = false;
  successMessage = false;
  loggedUserID: string
  storeID: string
  constructor(private userService: UserService, private routes: Router) {}

  ngOnInit(): void {
    this.loggedUserID = localStorage.getItem('userID')
    this.storeID = localStorage.getItem('storeID')
    if (this.loggedUserID) {
      this.loadProfile(this.loggedUserID);
      this.loadStoreDetails(this.storeID);
    } else {
      this.routes.navigate(['/login']);
    }
  }

  loadProfile(userid) {
    this.userService.getUserDetails(userid).subscribe((userDetails: UserDetails) => {
      if (userDetails) {
        this.user = userDetails;
        localStorage.setItem('username', this.user.name);
      }
    });

   /* this.name = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.phoneno = localStorage.getItem('phoneno');
    this.role = localStorage.getItem('role');*/
  }

  loadStoreDetails(storeID) {
    this.userService.getStoreDetails(storeID).subscribe((storeDetails: StoreDetails) => {
      if (storeDetails) {
        this.store = storeDetails;
      }
    });
  }

  updateUserDetails(newName, newEmail, newPhoneno) {
    if (this.user.name !== newName || this.user.email !== newEmail || this.user.phoneno !== newPhoneno) {
      this.userService.updateUserDetails(newName, newEmail, newPhoneno, this.loggedUserID).subscribe((res: string) => {
        if (res === 'success') {
          this.successMessage = true;
          this.message = 'Details updated successfully in database';
          this.loadProfile(this.loggedUserID);
        } else {
          this.failMessage = true;
          this.message = 'Failed to update details in database';
        }
        setTimeout(() => {
          this.failMessage = false;
          this.successMessage = false;
        }, 4000);
      });
    }
  }

  updateStoreDetails(newName, newPincode, newPhoneno, newAddress, newFB, newTW, newYT) {
    if (this.store.name !== newName || this.store.pincode !== newPincode || this.store.phoneno !== newPhoneno ||
      this.store.address !== newAddress || this.store.facebookURL !== newFB || this.store.twitterURL !== newTW ||
      this.store.youtubeURL !== newYT ) {
      this.userService.updateStoreDetails(newName, newPincode, newPhoneno, newAddress, newFB, newTW, newYT, this.storeID).subscribe(
        (res: string) => {
        if (res === 'success') {
          console.log(res)
          this.successMessage = true;
          this.message = 'Store Details updated successfully in database';
          this.loadStoreDetails(this.storeID);
        } else {
          this.failMessage = true;
          this.message = 'Failed to update store details in database';
        }
        setTimeout(() => {
          this.failMessage = false;
          this.successMessage = false;
        }, 4000);
      });
    }
  }
}
