import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
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
  filterButtons = [
      {
        id: 'perro'
        ,value: 0
        ,show:[
          'fas fa-dog fa-2x text-white-50'
          ,'fas fa-dog fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: ['perro']
        ,qryKey: 'especie'
        ,display: true
        ,text: ''
      }
      , {
        id: 'gato'
        ,value: 0
        ,show:[
          'fas fa-cat fa-2x text-white-50'
          ,'fas fa-cat fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: ['gato']
        ,qryKey: 'especie'
        ,display: true
        ,text: ''
      }
      , {
        id: 'aves'
        ,value: 0
        ,show:[
          'fas fa-dove fa-2x text-white-50'
          ,'fas fa-dove fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: ['ave']
        ,qryKey: 'especie'
        ,display: true
        ,text: ''
      }
      , {
        id: 'pez'
        ,value: 0
        ,show:[
          'fas fa-fish fa-2x text-white-50'
          ,'fas fa-fish fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: ['pez']
        ,qryKey: 'especie'
        ,display: false
        ,text: ''
      }
      , {
        id: 'caballo'
        ,value: 0
        ,show:[
          'fas fa-horse fa-2x text-white-50'
          ,'fas fa-horse fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: ['caballo']
        ,qryKey: 'especie'
        ,display: false
        ,text: ''
      }
      , {
        id: 'pesable'
        ,value: 0
        ,show:[ 'fa fa-balance-scale fa-2x text-white-50',
                'fa fa-balance-scale fa-2x text-white',
                'fa fa-balance-scale fa-2x text-danger'
              ]
        ,qryName: 'Extra'
        ,qryValue: [true, { $not: { $eq: true } }]
        ,qryKey: 'pesable'
        ,display: true
        ,text: ''
       }
       , {
        id: 'private_web'
        ,value: 1
        ,show:[ 'fas fa-prescription fa-2x text-white',
                'fas fa-prescription fa-2x text-white-50'
              ]
        ,qryName: 'Extra'
        ,qryValue: [{ $not: { $eq: true } }]
        ,qryKey: 'private_web'
        ,display: true
        ,text: ''
       }
       , {
        id: 'precio'
        ,value: 1
        ,show:[ 'fas fa-file-invoice-dollar fa-2x text-white-50',
                'fas fa-file-invoice-dollar fa-2x text-white'
              ]
        ,qryName: 'Extra'
        ,qryValue: [{ $gte: 1 }]
        ,qryKey: 'precio'
        ,display: true
        ,text: ''
       }
       , {
        id: 'stock'
        ,value: 1
        ,show:[ 'fa fa-shopping-cart fa-2x text-white-50',
                'fa fa-shopping-cart fa-2x text-white'
              ]
        ,qryName: 'Extra'
        ,qryValue: [{ $gte: 1 }]
        ,qryKey: 'stock'
        ,display: true
        ,text: ''
       }
       , {
        id: 'servicio'
        ,value: 0
        ,show:[ 'fa fa-2x text-white-50',
                'fa fa-2x text-white'
              ]
        ,qryName: 'Producto'
        ,qryValue: [{ $eq: true }]
        ,qryKey: 'servicio'
        ,display: true
        ,text: 'S'
       }
       , {
        id: 'compra'
        ,value: 0
        ,show:[ 'fa fa-2x text-white-50',
                'fa fa-2x text-white'
              ]
        ,qryName: 'Producto'
        ,qryValue: [{ $eq: true }]
        ,qryKey: 'pCompra'
        ,display: true
        ,text: 'C'
       }
       , {
        id: 'venta'
        ,value: 1
        ,show:[ 'fa fa-2x text-white-50',
                'fa fa-2x text-white'
              ]
        ,qryName: 'Producto'
        ,qryValue: [{ $eq: true }]
        ,qryKey: 'pVenta'
        ,display: true
        ,text: 'V'
       }

  ]
  filter = {
/*
    perro: { value: 'perro', display: true, qry: {}}
  , gato: { value: 'gato', display: true, qry: {}}
  , ave: { value: 'ave', display: true, qry: {}}
  , pez: { value: 'pez', display: false, qry: {}}
  , caballo: { value: 'caballo', display: false, qry: {}}
  ,
*/
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
      name: 'Rubro/Linea',
      vista: 1,
      sort: { rubro: 1, Linea: 1, marca: 1, especie: 1, fullName: 1 }
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
      sort: { marca: 1, rubro: 1, linea: 1, especie: 1, edad: -1, fullName: 1 }
    },
    {
      name: 'especie',
      vista: 1,
      sort: { especie: 1, edad: -1, rubro: 1, linea: 1, fullName: 1 }
    },
    {
      name: 'contenido',
      vista: 1,
      sort: { contiene: 1, precioref: 1 }
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
  showStock = true;

  constructor(
    private http: HttpClient,
    private list: ListasArtProdService
  ) {}

  ngOnInit(): void {
    this.listProductos();
  }

  ngOnChanges(changes): void {
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


  buttonMsg(array){
    console.log("Procesa Buttons Msg", array)
    this.filterButtons = array;
    const qry: any = {
      Articulo: {}
      ,Producto: {}
      ,Extra: {}
    }
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      if (el.value > 0) {
        qry[el.qryName][el.qryKey] = el.qryValue[el.value-1];
      }
    }
    console.log(qry);
    this.searchProductos(qry);
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
    this.searchProductos();
  }

  listProductos(): void {
    this.searchItem = ([] as any);
    this.searchProductos();
  }

  newReg(ev){
    console.log(ev)
  }
  selected( art ){
    console.log( art );
  }

  searchProductos(qry?:any): void {
    if (this.wait) { return; }
    this.wait = true;
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
/*
    if (this.filter.pesable.value) { Extra.pesable = this.filter.pesable.qry; }
    if (this.filter.private_web.value) { Extra.private_web = this.filter.private_web.qry; }
    if (this.filter.precio.value) { Extra.precio = this.filter.precio.qry; }
    if (this.filter.stock.value) { Extra.stock = this.filter.stock.qry; }
    if (this.filter.servicio.value) { Producto.servicio = this.filter.servicio.qry; }
    if (this.filter.pCompra.value) { Producto.pCompra = this.filter.pCompra.qry; }
    if (this.filter.pVenta.value) { Producto.pVenta = this.filter.pVenta.qry; }
*/
  //  console.log( 'LISTAORDEN' , this.articuloOrder[this.listaOrden].sort );
    const Sort = this.articuloOrder[this.listaOrden].sort;

//    this.list.buscaProductos({Articulo, Producto, Extra, searchItem: this.searchItem, Sort })
    this.list.readData(
      `${this.ApiUri}/productos/list`,
      {Articulo, Producto, Extra, searchItem: this.searchItem, Sort }
    ).subscribe(
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
          this.searchProductos();
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
/*
  buscaProductos(params: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.ApiUri}/productos/list`, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
  }
*/
}
