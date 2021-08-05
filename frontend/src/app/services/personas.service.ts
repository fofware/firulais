import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  ApiUri = API_URI;

  constructor(private http: HttpClient) { }

  fulllist(): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/personas/fulllist`)
              .toPromise();
  }

  import(persona: any ): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/persona/import`, persona)
              .toPromise();
  }

  save(persona: any): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/persona/save/`, persona)
              .toPromise();
  }
}
