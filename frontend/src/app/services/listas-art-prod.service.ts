import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from '../shared/uris';

@Injectable({
  providedIn: 'root'
})
export class ListasArtProdService {

  articuloList: any[] = [];
  wait: boolean = false;
  filter: any;
  listaOrden: any;
  searchItem: string = ""
  sort: { none: 0 };

  constructor(private http: HttpClient) { }

/*
  searchArticulos(): void {
    if (this.wait) { return; }
    this.wait = true;
    const Articulo: any = {};
    const Producto: any = {};
    const Extra: any = {};

//    if (this.filter.pesable.value) { Extra.pesable = this.filter.pesable.qry; }
    if (this.filter.private_web.value) { Articulo.private_web = this.filter.private_web.qry; }
//    if (this.filter.precio.value) { Extra.precio = this.filter.precio.qry; }
//    if (this.filter.stock.value) { Extra.stock = this.filter.stock.qry; }
//    if (this.filter.servicio.value) { Producto.servicio = this.filter.servicio.qry; }
//    if (this.filter.pCompra.value) { Producto.pCompra = this.filter.pCompra.qry; }
//    if (this.filter.pVenta.value) { Producto.pVenta = this.filter.pVenta.qry; }
    //  console.log( 'LISTAORDEN' , this.articuloOrder[this.listaOrden].sort );
//    const Sort = this.articuloOrder[this.listaOrden].sort;

    this.buscaArticulos(
      {
        Articulo,
        Producto,
        Extra,
        searchItem: this.searchItem,
        Sort: this.sort
      }
    ).subscribe(
      res => {
        //        this.calculaPrecios(res);
        const data = res as any;
        // tslint:disable-next-line:no-string-literal
        if ( data.length === 1
            && Articulo['$and']
            && Articulo['$and'].length === 1
            && (
                  this.searchItem === data[0].codigo
              ||  this.searchItem === data[0].plu
            )
          ){
//          this.onHeaderArticuloSelect.emit(data[0]);
            this.searchItem = '';
            this.wait = false;
            this.searchArticulos();
        } else {
          this.articuloList = data;
        }
        this.wait = false;
        console.log(this.articuloList);
      },
      err => {
        console.log(err);
        this.wait = true;
      }
    );
  }
  buscaArticulos(params: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${API_URI}/articulos/productos/list`, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
  }

  buscaProductos(params: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${API_URI}/productos/list`, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
  }
*/

  readData(srv: string, params: any):  Observable<any> {
    return new Observable((observer) => {
      this.http.post( srv, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
  }

}
