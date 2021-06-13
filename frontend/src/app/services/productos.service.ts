import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducto } from '../models/i-producto';
import { ArticulosService } from './articulos.service';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

//  ApiUri = 'http://192.168.0.2:3000/api'
  ApiUri = API_URI;

  constructor(private http: HttpClient) { }

  lista(): Promise<object>{
    return this.http
              .get(`${this.ApiUri}/productos/lista`)
              .toPromise();
  }
  list(): Promise<object>{
    return this.http
              .get(`${this.ApiUri}/productos/list`)
              .toPromise();
  }

  list_post(params: any): Promise<IProducto>{
    return this.http
              .post(`${this.ApiUri}/productos/list`, params )
              .toPromise();
/*
    const obs = new Observable((observer) => {
      this.http.post(`${this.ApiUri}/productos/list`, params ).subscribe(res => {
        const data: any = res;
//        const rpta = this.coockProdList(res);
        observer.next(res);
        // observable execution
        observer.complete();
      });
    });
    return obs;
*/
  }

  get(id: number): Promise<object> {
    return this.http
              .get(`${this.ApiUri}/producto/${id}`)
              .toPromise();
  }

  put(producto): Promise<object>{
    console.log(producto);
    return this.http
              .put(`${this.ApiUri}/producto/${producto._id}`, producto)
              .toPromise();
  }

  delete(id: any ): Promise<object>{
    return this.http
              .delete(`${this.ApiUri}/producto/${id}`)
              .toPromise();
  }
/*
  deleteMany(articulo){
    return this.http.delete(`${this.ApiUri}/producto/${articulo}/productos`);
  }
*/
  import(registro: IProducto ): Promise<object>{
    return this.http
      .post(`${this.ApiUri}/producto/import`, registro)
      .toPromise();
  }

  add(registro: IProducto ): Promise<object>{
    return this.http.post(`${this.ApiUri}/producto`, registro).toPromise();
  }

  insertMany(productos: IProducto[]): Promise<object>{
    return this.http
              .post(`${this.ApiUri}/productos/imany`, productos)
              .toPromise();
  }

  update(productos: IProducto[]): Promise<object>{
    return this.http
              .put(`${this.ApiUri}/productos`, productos)
              .toPromise();
  }

/*
  update(id: Object, updatedArticulo: iProducto ): Observable<iProducto>{
    return this.http.put(`${this.ApiUri}/articulo/${id}`, updatedArticulo );
  }
*/
  search(search: string): Promise<IProducto>{
    return this.http
              .get(`${this.ApiUri}/articulos/search/${search}`)
              .toPromise();
  }

  buscar(params: any): Promise<IProducto>{
    return this.http
              .post(`${this.ApiUri}/productos/buscar`, params )
              .toPromise();
/*
    const obs = new Observable((observer) => {
      this.http.post(`${this.ApiUri}/productos/buscar`, params ).subscribe(res => {
        const data: any = res;
//        const rpta = this.coockProdList(res);
        observer.next(res);
        // observable execution
        observer.complete();
      });
    });
    return obs;
*/
  }
/*
  coockProdList(data){
    const rpta = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      let parentname = `${e.name} ${e.contiene} ${e.unidad}`;
      let sumStock = e.stock * e.contiene;
      const p = {
        _id: e._id
        , articulo: e.art_id
        , name: `${e.art_name} ${parentname}`
        , precio: e.precio
        , pesable: e.pesable
        , image: e.image ? e.image : e.art_image
        , stock: e.stock
        , barcode: e.barcode
        , codigo: e.codigo
      };
      rpta.push(p);

      // tslint:disable-next-line:prefer-for-of
      for (let n = 0; n < e.productos.length; n++) {
        if (!e.productos[n].contiene) { e.productos[n].contiene = 1; }
        if (!e.productos[n].stock) { e.productos[n].stock = 0; }
        sumStock += e.productos[n].stock * e.productos[n].contiene;
      }
      // tslint:disable-next-line:prefer-for-of
      for (let n = 0; n < e.productos.length; n++) {
        if (e.productos[n]) {
          parentname = this.readParent(e.productos, e.productos[n]._id);
        } else {
          parentname = `${e.productos[n].name} ${e.productos[n].contiene} ${e.productos[n].unidad}`;
        }
        // tslint:disable-next-line:no-shadowed-variable
        const p = {
          _id: e.productos[n]._id
          , articulo: e.productos[n].articulo
          , name: `${e.name} ${parentname}`
          , precio: e.productos[n].precio
          , pesable: e.productos[n].pesable
          , image: e.image
          , stock: e.productos[n].stock
          , barcode: e.productos[n].barcode
          , codigo: e.productos[n].codigo
        };
        p.name = p.name.replace(/  /g, ' ');
//            if ( p.pesable && p.stock ==)
        // if (!rpta || rpta.length == 0) rpta[0] = p;
        // else
        if ( p.pesable ){
          if (p.stock === undefined || p.stock === 0) { p.stock = sumStock; }
          if ( sumStock > 0 || e.productos.length > 1) { rpta.push(p); }
        } else {
          rpta.push(p);
        }
      }
      rpta.sort( (a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (x < y) {return -1; }
        if (x > y) {return 1; }
        return 0;
      });
    }
    return rpta;
  }
  readParent(prodList, id: any, descr?: string): string {
    if (descr === undefined) { descr = ''; }
    const item = this.findProduct(prodList, id);
    if (item._id) {
      if (item.contiene) {
       descr += (item.unidad ? ` ${item.name} ${item.contiene} ${item.unidad}` : ` ${item.name} ${item.contiene}`);
      }
      else if (item.unidad) { descr += ` ${item.name} ${item.unidad}`; }
      else { descr += ` ${item.name}`; }
      if (item.parent != null) {
        descr = this.readParent(prodList, item.parent, descr);
      }
    }
    return descr.trim();
  }

  findProduct(prodList, id: any ) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < prodList.length; index++) {
      const element = prodList[index];
      if (element._id === id) { return element; }
    }
    return {};
  }

  newId(){
    return this.http.get(`${this.ApiUri}/Oid`);
  }
*/
}
