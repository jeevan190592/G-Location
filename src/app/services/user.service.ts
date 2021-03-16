import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Products, StoreDetails, UserDetails} from '../models';
import {
  AddStoreEndpoint,
  AddUserEndpoint,
  ChangePasswordEndpoint,
  DeleteProductEndpoint,
  DeleteStoreEndpoint,
  DeleteUserEndpoint,
  GetAllStoreDetailsEndpoint,
  GetAllUsersEndpoint,
  GetStoreDetailsEndpoint,
  GetUserDetailsEndpoint,
  UpdateStoreDetailsEndpoint,
  UpdateUserDetailsEndpoint, uploadImageEndpoint, uploadProfileImageEndpoint
} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserDetails(userID: string): Observable<UserDetails> {
    const api = GetUserDetailsEndpoint + '/' + userID;
    return this.http.get<UserDetails>(api).pipe(
      map((user: UserDetails) => {
        return user;
      }));
  }

  getStoreDetails(storeID: string): Observable<StoreDetails> {
    const api = GetStoreDetailsEndpoint + '/' + storeID;
    return this.http.get<StoreDetails>(api).pipe(
      map((store: StoreDetails) => {
        return store;
      }));
  }

  getAllStores(): Observable<StoreDetails[]> {
    return this.http.get<StoreDetails[]>(GetAllStoreDetailsEndpoint).pipe(
      map((store: StoreDetails[]) => {
        return store;
      }));
  }

  getAllStoresWithName(): Observable<StoreDetails[]> {
    return this.http.get<StoreDetails[]>(GetAllStoreDetailsEndpoint).pipe(
      map((store: StoreDetails[]) => {
        return store;
      }));
  }

  getAllUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(GetAllUsersEndpoint).pipe(
      map((users: UserDetails[]) => {
        return users;
      }));
  }

  updateUserDetails(newName, newEmail, newPhoneno, password, role, username, store, userID): Observable<string> {
    const requestBody = {
      name: newName, email: newEmail, phoneno: newPhoneno, password: password, role: role, username: username, store: store, id: userID
    };
    return this.http.put(UpdateUserDetailsEndpoint, requestBody, {responseType: 'text'});
  }

  updateStoreDetails(newName, newPincode, newPhoneno, newAddress, newFB, newTW, newYT, userID): Observable<string> {
    const requestBody = {
      name: newName,
      pincode: newPincode,
      phoneno: newPhoneno,
      address: newAddress,
      fb: newFB,
      tw: newTW,
      yt: newYT,
      id: userID
    };
    return this.http.put(UpdateStoreDetailsEndpoint, requestBody, {responseType: 'text'});
  }

  changePassword(newPassword, userID): Observable<string> {
    const requestBody = {
      password: newPassword, id: userID
    };
    return this.http.put(ChangePasswordEndpoint, requestBody, {responseType: 'text'});
  }

  addUser(userID, name, email, password, phoneno, storeid, role): Observable<string> {
    const requestBody = {
      userID: userID, name: name, email: email, password: password, phoneno: phoneno, store: storeid, role: role
    };
    return this.http.post(AddUserEndpoint, requestBody, {responseType: 'text'});
  }

  addStore(name, phoneno, pincode, FB, Twitter, Youtube, address): Observable<string> {
    const requestBody = {
      name: name, pincode: pincode, FB: FB, twitter: Twitter, youtube: Youtube, phoneno: phoneno, address: address
    };
    return this.http.post(AddStoreEndpoint, requestBody, {responseType: 'text'});
  }

  deleteUser(user: UserDetails): Observable<string> {
    const deleteUser = DeleteUserEndpoint + '/' + user.id;
    return this.http.delete(deleteUser, {responseType: 'text'});
  }

  deleteStore(store: StoreDetails): Observable<string> {
    const deleteStore = DeleteStoreEndpoint + '/' + store.id;
    return this.http.delete(deleteStore, {responseType: 'text'});
  }

  profileImageUpload(form: any): Observable<any> {
    return this.http.post(uploadProfileImageEndpoint, form, {responseType: 'text'});
  }
}
