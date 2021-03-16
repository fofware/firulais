import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {

  ApiUri = API_URI;
  constructor( private http: HttpClient ) { }

  import(comp: any): Promise<object>{
    return this.http
              .post(`${this.ApiUri}/comprobante/import`, comp)
              .toPromise();
  }
  add(comp: any): Promise<object>{
    return this.http
              .post(`${this.ApiUri}/comprobante/add`, comp)
              .toPromise();
  }
  save(comp: any): Promise<object>{
    console.log('save');
    return this.http
              .post(`${this.ApiUri}/comprobante/add`, comp)
              .toPromise();
/*
    return new Observable((observer) => {
      this.http.post(`${this.ApiUri}/comprobante/add`, comp)
      .subscribe(res => {
        observer.next(res);
        observer.complete();
      });
    });
    */
  }
}
