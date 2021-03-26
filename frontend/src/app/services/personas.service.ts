import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  ApiUri = API_URI;

  constructor(private http: HttpClient) { }

  import(persona: any ): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/persona/import`, persona)
              .toPromise();
  }
}
