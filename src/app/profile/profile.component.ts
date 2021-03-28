import {Component, OnInit, ViewChild} from '@angular/core';
import {Products, StoreDetails, UserDetails} from '../models';
import {ProductService} from '../services/product.service';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {FormBuilder, FormGroup} from '@angular/forms';

let data: any;

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: UserDetails;
  store: StoreDetails;
  stores: StoreDetails[];
  allManagersInstore: UserDetails[];
  message = '';
  failMessage = false;
  successMessage = false;
  loggedUserName: string;
  loggedUserID: string;
  storeID: string;
  newUserStoreSelected: string;
  newUserRoleSelected: string;
  isAdmin: boolean;
  form: FormGroup;
  freezeStore = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private routes: Router) {
  }

  editing = {};
  userRows = [];
  temp = [...this.userRows];
  readOnly = true;

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  ngOnInit(): void {
    this.loggedUserID = localStorage.getItem('userID');
    this.loggedUserName = localStorage.getItem('userName');
    this.storeID = localStorage.getItem('storeID');
    this.isAdmin = (localStorage.getItem('role') === 'Admin') ? true : false;

    if (this.storeID && this.loggedUserID) {
      this.readOnly = false;
      this.loadProfile(this.loggedUserID);
    } else if (this.storeID && !this.loggedUserID) {
      this.readOnly = true;
      this.getUserDetails(this.storeID);
      this.getAllManagersInStore(this.storeID);
    } else {
      this.routes.navigate(['/login']);
    }
    this.loadStoreDetails(this.storeID);
    this.getStores();
    this.getUsers();
    this.form = this.formBuilder.group({
      profile: ['']
    });
  }

  getUserDetails(storeID) {
    console.log(storeID);
    this.userService.getUserID(storeID).subscribe((user: UserDetails) => {
      if (user) {
        this.user = user;
        console.log(user);
      }
    });
  }

  getStores() {
    this.userService.getAllStores().subscribe((stores: StoreDetails[]) => {
      if (stores) {
        this.stores = stores;
      }
    });
  }

  getAllManagersInStore(storeID) {
    this.userService.getAllManagersInStore(storeID).subscribe((users: UserDetails[]) => {
      if (users) {
        this.allManagersInstore = users;
        console.log('AllUsers - ', users);
      }
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((users: UserDetails[]) => {
      if (users) {
        this.userRows = users;
        data = users;
        this.temp = [...data];
        this.table = data;
      }
    });
  }

  loadProfile(userid) {
    this.userService.getUserDetails(userid).subscribe((userDetails: UserDetails) => {
      if (userDetails) {
        this.user = userDetails;
        localStorage.setItem('user', this.user.name);
        this.allManagersInstore = [];
        this.allManagersInstore[0] = userDetails;
      }
    });

  }

  loadStoreDetails(storeID) {
    this.userService.getStoreDetails(storeID).subscribe((storeDetails: StoreDetails) => {
      if (storeDetails) {
        this.store = storeDetails;
      }
    });
  }

  updateUserDetails(newName, newEmail, newPhoneno, password?, role?, username?, store?) {
    role = role ? role : localStorage.getItem('role');
    username = username ? username : this.loggedUserName;
    store = store ? store : this.storeID;
    password = password ? password : localStorage.getItem('password');
    if (this.user.name !== newName || this.user.email !== newEmail || this.user.phoneno !== newPhoneno ||
      this.user.password !== password || this.user.role !== role || this.user.username !== username || this.user.store !== store) {
      this.userService.updateUserDetails(newName, newEmail, newPhoneno, password, role, username, store, this.loggedUserID)
        .subscribe((res: string) => {
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
      this.store.youtubeURL !== newYT) {
      this.userService.updateStoreDetails(newName, newPincode, newPhoneno, newAddress, newFB, newTW, newYT, this.storeID).subscribe(
        (res: string) => {
          if (res === 'success') {
            console.log(res);
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

  changePassword(oldPassword, newPassword, reNewPassword, form) {
    let error: string;
    if (oldPassword === localStorage.getItem('password')) {
      if (oldPassword !== newPassword) {
        if (newPassword === reNewPassword) {
          this.userService.changePassword(newPassword, this.loggedUserID).subscribe((res: string) => {
            if (res) {
              if (res === 'success') {
                console.log(res);
                this.successMessage = true;
                this.message = 'Password updated successfully in database';
                localStorage.setItem('password', newPassword);
                form.reset();
              } else {
                this.failMessage = true;
                this.message = 'Failed to update password in database';
              }
              setTimeout(() => {
                this.failMessage = false;
                this.successMessage = false;
              }, 4000);
            }
          });
        } else {
          error = 'New Passwords doesnot match';
        }
      } else {
        error = 'Old password and new password cannot be same';
      }
    } else {
      error = 'Current password is wrong. please provide correct password';
    }
    if (error) {
      this.failMessage = true;
      this.message = error;
    }
  }

  changeStoreSelected(selectedStore: any) {
    this.newUserStoreSelected = selectedStore.value;
  }

  changeRoleSelected(selectedRole: any) {
    this.newUserRoleSelected = selectedRole.value;
    this.newUserStoreSelected = '0';
    if (selectedRole.value === 'Admin') {
      this.freezeStore = true;
    } else {
      this.freezeStore = false;
    }
  }


  addUser(userID, name, email, password, phoneno, form) {
    if (this.newUserRoleSelected !== 'Admin' && !this.newUserStoreSelected) {
      this.failMessage = true;
      this.message = 'Store information is mandatory';
      return;
    }
    if (userID) {
      for (const user of this.userRows) {
        if (user.username === userID) {
          this.failMessage = true;
          this.message = 'USER ID already available. Please use different one';
          return;
        }
      }
    }
    if (userID && name && email && password && phoneno) {
      this.userService.addUser(userID, name, email, password, phoneno, this.newUserStoreSelected, this.newUserRoleSelected)
        .subscribe((res) => {
          if (res) {
            if (res === 'success') {
              console.log(res);
              this.successMessage = true;
              this.failMessage = false;
              this.message = 'User added successfully in database';
              this.getUsers();
              form.reset();
            } else {
              this.failMessage = true;
              this.message = 'Failed to add user in database';
            }
            setTimeout(() => {
              this.failMessage = false;
              this.successMessage = false;
            }, 4000);
          }
        });
    } else {
      this.failMessage = true;
      this.message = 'Please provide information in all fields';
    }
  }

  addStore(name, phoneno, pincode, FB, Twitter, Youtube, address, form) {
    this.getStores();
    for (const store of this.stores) {
      if (store.name === name && store.pincode === Number(pincode)) {
        this.failMessage = true;
        this.message = 'Store is already available with the same name and pincode';
        return;
      }
    }

    this.userService.addStore(name, phoneno, pincode, FB, Twitter, Youtube, address).subscribe((res) => {
      if (res) {
        if (res === 'success') {
          console.log(res);
          this.successMessage = true;
          this.failMessage = false;
          this.message = 'Store added successfully in database';
          this.getStores();
          form.reset();
        } else {
          this.failMessage = true;
          this.message = 'Failed to add store in database';
        }
        setTimeout(() => {
          this.failMessage = false;
          this.successMessage = false;
        }, 4000);
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.userRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    if (!event.target.value) {
      alert('Cannot save empty fields');
      return;
    }
    if (cell === 'phoneno') {
      if (!(/^\d+$/.test(event.target.value))) {
        alert('Please provide only numbers');
        return;
      }
    }
    if (this.userRows[rowIndex][cell] !== event.target.value) {
      console.log('inline editing rowIndex', rowIndex);
      this.editing[rowIndex + '-' + cell] = false;
      this.userRows[rowIndex][cell] = event.target.value;
      this.userRows = [...this.userRows];
      this.updateUserDetails(this.userRows[rowIndex]['name'], this.userRows[rowIndex]['email'], this.userRows[rowIndex]['phoneno'],
        this.userRows[rowIndex]['password'], this.userRows[rowIndex]['role'], this.userRows[rowIndex]['username'], this.userRows[rowIndex]['store']);
      console.log('UPDATED!', this.userRows[rowIndex][cell]);
    }
  }

  deleteUser(rowIndex) {
    if (confirm('Are you sure to delete ' + this.userRows[rowIndex].name)) {
      this.userService.deleteUser(this.userRows[rowIndex]).subscribe((result: string) => {
        if (result === 'success') {
          this.getUsers();
          this.successMessage = true;
          this.message = 'User deleted successfully in database';
        } else {
          this.failMessage = true;
          this.message = 'Failed to delete user in database';
        }
        setTimeout(() => {
          this.failMessage = false;
          this.successMessage = false;
        }, 3000);
      });
    }
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
    console.log(this.form.get('profile').value);
  }

  profileImageupload(form) {
    const formData = new FormData();
    formData.append('file', this.form.get('profile').value);
    formData.append('id', localStorage.getItem('userID'));
    this.userService.profileImageUpload(formData).subscribe(
      (res) => {
        if (res === 'success') {
          this.loadProfile(this.loggedUserID);
          form.reset();
          this.successMessage = true;
          this.message = 'Image uploaded successfully in database';
        } else {
          this.failMessage = true;
          this.message = 'Failed to upload image in database';
        }
        setTimeout(() => {
          this.failMessage = false;
          this.successMessage = false;
        }, 3000);
      });
  }

}
