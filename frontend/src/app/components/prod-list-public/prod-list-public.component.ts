import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tpLista } from 'src/app/shared/toolbox';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-prod-list-public',
  templateUrl: './prod-list-public.component.html',
  styleUrls: ['./prod-list-public.component.css']
})
export class ProdListPublicComponent implements OnInit, OnChanges {
  ApiUri = API_URI;
  wait = false;
  searchItem = '';
  lista = tpLista;
  cmpSetting = {
    tipo: 'Venta',
    public: true
  };

  articuloList: any[] = [];

  filter = {
    pesable: { value: false,  display: true, qry: true }
  , precio: { value: true, display: true,  qry: { $gt: 0 }}
  , stock:  { value: true, display: true,  qry: { $gte: 1 }}
  , servicio: { value: false, display: true, qry: {$eq: true} }
  , pCompra: { value: false, display: true, qry: { $eq: true }}
  , pVenta: { value: true, display: true, qry: { $eq: true }}
  , private_web: { value: true, display: true, qry: { $not: { $eq: true } } }
  };
  articuloOrder = [
    {
      name: 'Descripción',
      vista: 1,
      sort: { art_name: 1, name: 1, contiene: 1, unidad: 1, 'sub.name': 1, 'sub.contiene': 1, 'sub.unidad': 1  }
    },
    {
      name: 'Rubro/Especie',
      vista: 1,
      sort: { rubro: 1, especie: 1, edad: -1, precioref: 1 }
    },
    {
      name: 'fabricante',
      vista: 1,
      sort: { fabricante: 1, marca: 1, rubro: 1, linea: 1, especie: 1, edad: -1, art_name: 1, raza: 1 }
    },
    {
      name: 'marca',
      vista: 1,
      sort: { marca: 1, rubro: 1, linea: 1, especie: 1, edad: -1, art_name: 1, name: 1, contiene: -1 }
    },
    {
      name: 'especie',
      vista: 1,
      sort: { especie: 1, edad: -1, rubro: 1, linea: 1, fullName: 1 }
    },
    {
      icon: '<i class="fas fa-search-dollar"></i>',
      name: 'precio',
      vista: 1,
      sort: { precio: 1 }
    },
    {
      icon: '<i class="fas fa-search-dollar"></i>',
      name: 'Precio/Un',
      vista: 1,
      sort: { precioref: 1 }
    }
  ];
  listaOrden = 0;
  showArticulos = true;
  publico = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listArticulos();
  }

  ngOnChanges(): void {
//    console.log('PROD-LIST-PUBLIC OnChanges');
/*
    console.log(changes);
    for (const propName in changes) {
      console.log(propName, changes[propName]);
//      this.changePrecio();
    }
*/

  }
  addProducto(event): void {

  }

  Prod_filterEvent( ev ): void {
//    console.log( event );
    // tslint:disable-next-line:forin
    for (const propName in ev) {
//      console.log(propName, ev[propName]);
      this[propName] = ev[propName];
    }

//    this.searchItem = event.searchItem;
  //  this.filter = event.filter;
    this.searchArticulos();
  }

  listArticulos(): void {
    this.searchItem = ([] as any);
    this.searchArticulos();
  }

  searchArticulos(): void {
    if (this.wait) { return; }
    this.wait = true;
    const Articulo: any = {};
    const Producto: any = {};
    const Extra: any = {};

    if (this.filter.pesable.value) { Extra.pesable = this.filter.pesable.qry; }
    if (this.filter.private_web.value) { Extra.private_web = this.filter.private_web.qry; }
//    if (this.setting.precio.value) { Producto.precio = this.filter.precio.qry; }
    if (this.filter.stock.value) { Extra.stock = this.filter.stock.qry; }
    if (this.filter.servicio.value) { Producto.servicio = this.filter.servicio.qry; }
    if (this.filter.pCompra.value) { Producto.pCompra = this.filter.pCompra.qry; }
    if (this.filter.pVenta.value) { Producto.pVenta = this.filter.pVenta.qry; }
  //  console.log( 'LISTAORDEN' , this.articuloOrder[this.listaOrden].sort );
    const Sort = this.articuloOrder[this.listaOrden].sort;

    this.buscaProductos({Articulo, Producto, Extra, searchItem: this.searchItem, Sort })
    .subscribe(
      res => {
//        this.calculaPrecios(res);
        const data = res as any;
        // tslint:disable-next-line:no-string-literal
        if ( data.length === 1 && Articulo['$and'] && Articulo['$and'].length === 1
        && ( this.searchItem === data[0].codigo || this.searchItem === data[0].plu ))
        {
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
  buscaProductos(params: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.ApiUri}/productos/list`, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
  }

}
