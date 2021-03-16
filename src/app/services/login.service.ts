import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {UserDetails} from '../models';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {LoginEndpoint} from '../constants';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<UserDetails> {
    const requestBody = { userName: username, password: password }
    return this.http.post<UserDetails[]>(LoginEndpoint, requestBody).pipe(
      map((user: UserDetails[]) => {
          return user[0];
      }));
  }
}
