import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    const requestBody = { user: username, email: password, id: 0 }
    return this.http.post('http://localhost:3000/api/register', requestBody,
      {responseType: 'text'})
  }

  logind(username: string, password: string) {
    return this.http.get('/api/login')
  }
}
