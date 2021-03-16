import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  ApiUri = API_URI;

  constructor(private http: HttpClient) { }

  import(user: any ): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/user/import`, user)
              .toPromise();
  }
}
