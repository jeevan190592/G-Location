import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DeleteImageEndpoint, LoadGalleryEndpoint, uploadImageEndpoint} from '../constants';
import {Gallery} from '../models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) {
  }

  upload(form: any): Observable<any> {
    return this.http.post(uploadImageEndpoint, form, {responseType: 'text'});
  }

  loadGallery(storeID): Observable<Gallery[]> {
    const endPoint = LoadGalleryEndpoint + '/' + storeID
    return this.http.get<Gallery[]>(endPoint);
  }

  deleteImage(storeID, imageID): Observable<string> {
    const endPoint = DeleteImageEndpoint + '/' + imageID + '/' + storeID
    return this.http.delete(endPoint, {responseType: 'text'});
  }
}
