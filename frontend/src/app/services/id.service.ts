import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  ApiUri = API_URI;
  constructor( private http: HttpClient ) { }

  generate(): Promise<object>{
    return this.http
              .get(`${this.ApiUri}/Oid`)
              .toPromise();
  }

}
