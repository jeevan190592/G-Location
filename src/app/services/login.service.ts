import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {UserDetails} from '../models';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {LoginEndpoint, RegisterEndpoint} from '../constants';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }


  register(username: string, password: string) {
    const requestBody = { user: username, email: password, id: 0 }
    return this.http.post(RegisterEndpoint, requestBody, {responseType: 'text'});
  }

  login(username: string, password: string): Observable<UserDetails> {
    const requestBody = { username: username, password: password }
    return this.http.post<UserDetails[]>(LoginEndpoint, requestBody).pipe(
      map((user: UserDetails[]) => {
          return user[0];
      }));
  }
}
