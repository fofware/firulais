import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})

export class ListasArtProdService {

  constructor(private http: HttpClient) { }

  getData(srv: string, params: any): Promise<any> {
    return this.http.get( srv, params ).toPromise();
  }

  readData(srv: string, params: any): Promise<any> | Observable<any> {
    return this.http.post( srv, params ).toPromise();
  }

  saveData(srv: string, params: any): Promise<object> {
    return this.http.post( srv, params).toPromise();
  }

  import(data: any): Promise<object>{
    return this.http.post( `${API_URI}/proveedoreslistas/import`, data ).toPromise();
  }
  getId(data: any){
    return this.http.post( `${API_URI}/proveedoreslistas/getid`, data ).toPromise();
  }
}
