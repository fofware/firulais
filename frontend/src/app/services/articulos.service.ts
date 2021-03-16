import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { IArticulo } from '../models/i-articulo';
import { API_URI } from '../common/utils';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

//  ApiUri = 'http://192.168.0.2:3000/api'
  ApiUri = API_URI;

  constructor(private http: HttpClient) { }

  list(): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/articulos/list`)
              .toPromise();
  }
  listProductos(): Promise<object> {
    // tslint:disable-next-line:object-literal-key-quotes
    const parameters = {Articulo: {}, Producto: {}, Sort: { 'fabricante': 1, 'marca': 1, 'especie': 1, 'edad': 1, 'raza': 1, 'rubro': 1, 'linea': 1, 'name': 1 } };
    console.log(parameters);
    return this.http
              .post(`${this.ApiUri}/articulos/productos/list`, parameters)
              .toPromise();
/*
//    const parameters = {};
    const obs = new Observable((observer) => {
      this.http.post(`${this.ApiUri}/articulos/productos/list`, parameters)
      .subscribe( rpta => {
//        this.checkParent(rpta);
        observer.next(rpta);
        // observable execution
        observer.complete();
      });
    });
    return obs;
  */
 }
  listaSearchProd(parameters): Promise<object>{
    console.log(parameters);
    return this.http
              .post(`${this.ApiUri}/articulos/productos/list`, parameters)
              .toPromise();
/*
    const obs = new Observable((observer) => {
      this.http.post(`${this.ApiUri}/articulos/productos/list`, parameters)
      .subscribe( rpta => {
        this.checkParent(rpta);
        observer.next(rpta);
        // observable execution
        observer.complete();
      });
    });
    return obs;
  */
  }
  get(id: number): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/articulo/${id}`)
              .toPromise();
  }
  leerArticuloProductos( id: string ): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/articulo/productos/${id}`)
              .toPromise();
  }
  delete(id: string): Promise<object> {
    return this.http
              .delete(`${this.ApiUri}/articulo/${id}`)
              .toPromise();
  }
  import(articulo: any ): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/articulo/import`, articulo)
              .toPromise();
  }
  add(articulo: any ): Promise<object> {
    return this.http
              .post(`${this.ApiUri}/articulo`, articulo)
              .toPromise();
  }
  update(id: any, updatedArticulo: IArticulo ): Promise<object>{
    return this.http
              .put(`${this.ApiUri}/articulo/${id}`, updatedArticulo )
              .toPromise();
  }
  search(search: string): Promise<object>{
    return this.http
              .get(`${this.ApiUri}/articulos/productos/:search/${search}`)
              .toPromise();
/*
    const obs = new Observable((observer) => {
      this.http.get(`${this.ApiUri}/articulos/productos/:search/${search}`)
      .subscribe( rpta => {
        this.checkParent(rpta);
        observer.next(rpta);
        // observable execution
        observer.complete();
      });
    });
    return obs;
  */
  }
  searchProductos(search: string): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/articulos/productos/list/${search}`)
              .toPromise();
/*
    const obs = new Observable((observer) => {
      this.http.get(`${this.ApiUri}/articulos/productos/list/${search}`)
      .subscribe( rpta => {
        this.checkParent(rpta);
        observer.next(rpta);
        // observable execution
        observer.complete();
      });
    });
    return obs;
*/
  }
  newId(): Observable<object> {
    return this.http.get(`${this.ApiUri}/Oid`);
  }

  checkParent(regs): void {
    // tslint:disable-next-line:prefer-for-of
    for (let inx = 0; inx < regs.length; inx++) {
      const e = regs[inx];
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < e.productos.length; index++) {
        const p = e.productos[index];
        if (p.parent === p._id) {
          console.log(e);
        }
        if (p.parent && p.parent !== p._id && p.pesable === false){
          console.log('ENTRO', e, p);
          p.parentname = this.readParent(e.productos, p._id);
        } else {
          p.parentname = `${p.name} ${p.contiene} ${p.unidad}`;
        }
      }
    }
  }
  readParent(prodList, id: any, descr?: string): string {
    if (descr === undefined) { descr = ''; }
    const item: any = this.findProduct(prodList, id);
    if (item._id) {
      if (item.contiene && item.contiene > 1) {
       descr += (item.unidad ? ` ${item.name} ${item.contiene} ${item.unidad}` : ` ${item.name} ${item.contiene}`);
      }
      else if (item.unidad) { descr += ` ${item.name} ${item.unidad}`; }
      else { descr += ` ${item.name}`; }
      if (item.parent != null && item.parent !== item._id && item.pesable === false) {
        descr = this.readParent(prodList, item.parent, descr);
      }
    }
    return descr.trim();
  }
  findProduct(prodList, id: any ): object {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < prodList.length; index++) {
      const element = prodList[index];
      if (element._id === id) { return element; }
    }
    return {};
  }
}
