import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Products, UserDetails} from '../models';
import {AddProductEndpoint, DeleteProductEndpoint, LoginEndpoint, ProductEndpoint, UpdateProductEndpoint} from '../constants';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(userID: string): Observable<Products[]> {
    const requestBody = {username: userID};
    return this.http.get<Products[]>(ProductEndpoint).pipe(
      map((product: Products[]) => {
        return product;
      }));
  }

  updateProduct(product: Products): Observable<string> {
    const requestBody = {product: product};
    return this.http.put(UpdateProductEndpoint, requestBody, {responseType: 'text'});
  }

  addProduct(name: string, barcode: string, location: string, price: string, weight: string): Observable<string> {
    const requestBody = {
      name: name, barcode: barcode, store_id: localStorage.getItem('storeID'), location: location, price: price, weight: weight
    };
    return this.http.post(AddProductEndpoint, requestBody, {responseType: 'text'});
  }

  deleteProduct(product: Products): Observable<string> {
    const deleteProduct = DeleteProductEndpoint + '/' + product.id + '/' + product.store_id
    console.log(deleteProduct)
    return this.http.delete(deleteProduct, {responseType: 'text'});
  }
}
