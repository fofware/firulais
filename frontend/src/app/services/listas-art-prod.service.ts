import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})

export class ListasArtProdService {

  constructor(private http: HttpClient) { }

  readData(srv: string, params: any): Promise<any> | Observable<any> {
    /*
    return new Observable((observer) => {
      this.http.post( srv, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
    */
    return this.http.post( srv, params ).toPromise();
  }

  saveData(srv: string, params: any): Promise<object> {
    return this.http.post( srv, params).toPromise();
  }

}
