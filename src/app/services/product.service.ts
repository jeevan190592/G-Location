import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Products} from '../models';
import {ProductEndpoint, UpdateProductEndpoint} from '../constants';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(userID: string): Observable<Products[]> {
    const requestBody = { username: userID }
    return this.http.get<Products[]>(ProductEndpoint).pipe(
      map((product: Products[]) => {
        return product;
      }));
  }

  updateProduct(product: Products): Observable<string> {
    const requestBody = { product: product }
    return this.http.put(UpdateProductEndpoint, requestBody, {responseType: 'text'});
  }
}
