import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../shared/uris';

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
  profile(): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/user/profile`)
              .toPromise();

  }
  fulllist(): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/users/list`)
              .toPromise();
  }
  save(user:any): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/user/save/`, user)
              .toPromise();
  }
  findUserByEmail(email): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/user/email/:id`,email)
              .toPromise()
  }
}
