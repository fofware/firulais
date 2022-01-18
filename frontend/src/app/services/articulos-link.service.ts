import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})
export class ArticulosLinkService {

  constructor(private http: HttpClient) { }

  async artProvList(filtro?:any): Promise<any> {
    console.log(filtro);
    return this.http
    .post(`${API_URI}/proveedoresarticulos/text/`, filtro )
    .toPromise();

  }
  async artProvToLink(filtro?:any): Promise<any> {
    console.log(filtro);
    return this.http
    .post(`${API_URI}/proveedoresarticulos/linksearch/`, filtro )
    .toPromise();

  }
  async prodList(search:any): Promise<any> {
    return this.http
    .get(`${API_URI}/productos/textsearch/`, search)
    .toPromise();
  }

}
