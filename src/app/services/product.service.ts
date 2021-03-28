import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Gallery, Products} from '../models';
import {
  AddProductEndpoint, DeleteImageEndpoint, DeleteMapLayoutEndpoint,
  DeleteProductEndpoint, LoadGalleryEndpoint, LoadMapLayoutEndpoint,
  LoginEndpoint,
  ProductEndpoint,
  UpdateProductEndpoint,
  uploadImageEndpoint, uploadMapLayoutEndpoint
} from '../constants';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(storeID: string): Observable<Products[]> {
    const endPoint = ProductEndpoint + '/' + storeID;
    console.log(endPoint)
    return this.http.get<Products[]>(endPoint).pipe(
      map((product: Products[]) => {
        console.log(product)
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

  uploadMapLayout(form: any): Observable<any> {
    return this.http.post(uploadMapLayoutEndpoint, form, {responseType: 'text'});
  }

  loadMapLayout(storeID): Observable<Gallery[]> {
    const endPoint = LoadMapLayoutEndpoint + '/' + storeID
    return this.http.get<Gallery[]>(endPoint);
  }

  deleteMaplayout(storeID, imageID, name): Observable<string> {
    const endPoint = DeleteMapLayoutEndpoint + '/' + imageID + '/' + storeID + '/' + name
    return this.http.delete(endPoint, {responseType: 'text'});
  }
}
