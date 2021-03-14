import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StoreDetails, UserDetails} from '../models';
import {
  AddProductEndpoint,
  GetStoreDetailsEndpoint,
  GetUserDetailsEndpoint,
  UpdateStoreDetailsEndpoint,
  UpdateUserDetailsEndpoint
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

  updateUserDetails(newName, newEmail, newPhoneno, userID): Observable<string> {
    const requestBody = {
      name: newName, email: newEmail, phoneno: newPhoneno, id: userID
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
}
