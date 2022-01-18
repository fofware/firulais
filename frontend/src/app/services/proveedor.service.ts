import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  ApiUri = API_URI;

  constructor(private http: HttpClient) { }

  list(): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/proveedores/list`)
              .toPromise();
  }
  save(data): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/proveedores/save`,data)
              .toPromise();
  }

}
