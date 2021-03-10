import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {userDetails} from "../models";
import {Observable} from "rxjs";

import { catchError, map } from 'rxjs/operators'


const ApiHost: string = 'http://localhost:3000/api/'
const LoginEndpoint: string = ApiHost + 'login'
const RegisterEndpoint: string = ApiHost + 'register'

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  constructor(private http: HttpClient) { }


  register(username: string, password: string) {
    const requestBody = { user: username, email: password, id: 0 }
    return this.http.post(RegisterEndpoint, requestBody,{responseType: 'text'})
  }

  login(username: string, password: string): Observable<userDetails> {
    const requestBody = { username: username, password: password }
    return this.http.post<userDetails[]>(LoginEndpoint, requestBody).pipe(
      map((user: userDetails[]) => {
          return user[0]
      }))
  }
}
