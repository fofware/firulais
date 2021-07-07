import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Observable } from 'rxjs';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { PrintService } from 'src/app/services/print.service';
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
  fpago = 0;
  fpagoCoef = 1;
  lista = tpLista;
  cmpSetting = {
    tipo: 'Venta',
    public: true
  };
  contiene = {};
  articuloList: any[] = [];
  filterButtons = [
      {
        id: 'especie'
        , tipo: 'radioButton'
        , buttons:[
          {
            id: 'perro'
            ,value: 0
            ,show:[
              'fas fa-dog fa-2x text-white-50'
              ,'fas fa-dog fa-2x text-white'
            ]
            ,qryName: 'Articulo'
            ,qryValue: [{$regex: { patern:'perro', flags: 'i'}}]
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
            ,qryValue: [{$regex: { patern:'gato', flags: 'i'}}]
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
            ,qryValue: [{$regex: { patern:'ave', flags: 'i'}}]
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
            ,qryValue: [{$regex: { patern:'pez', flags: 'i'}}]
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
            ,qryValue: [{$regex: { patern:'caballo', flags: 'i'}}]
            ,qryKey: 'especie'
            ,display: false
            ,text: ''
          }

        ]
      }
      , {
        id: 'pesable'
        , tipo: 'button'
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
        id: 'box'
        , tipo: 'button'
        ,value: 0
        ,show:[ 'fa fas fa-box fa-2x text-white-50',
                'fa fas fa-box fa-2x text-white',
                'fa fas fa-box fa-2x text-danger'
              ]
        ,qryName: 'Extra'
        ,qryValue: [{ $eq: 0 }, { $not: { $eq: 0 } }]
        ,qryKey: 'count_ins'
        ,display: true
        ,text: ''
       }
       , {
        id: 'private_web'
        , tipo: 'button'
        ,value: 1
        ,show:[ 'fas fa-prescription fa-2x text-white',
                'fas fa-prescription fa-2x text-white-50'
              ]
        ,qryName: 'Articulo'
        ,qryValue: [{ $not: { $eq: true } }]
        ,qryKey: 'private_web'
        ,display: true
        ,text: ''
       }
       , {
        id: 'precio'
        , tipo: 'button'
        ,value: 1
        ,show:[ 'fas fa-file-invoice-dollar fa-2x text-white-50',
                'fas fa-file-invoice-dollar fa-2x text-white'
              ]
        ,qryName: 'Extra'
        ,qryValue: [{ $gte: 1 }]
        ,qryKey: 'precio'
        ,display: false
        ,text: ''
       }
       , {
        id: 'stock'
        , tipo: 'button'
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
        , tipo: 'button'
        ,value: 0
        ,show:[ 'fa fa-2x text-white-50',
                'fa fa-2x text-white'
              ]
        ,qryName: 'Producto'
        ,qryValue: [{ $eq: true }]
        ,qryKey: 'servicio'
        ,display: false
        ,text: 'S'
       }
       , {
        id: 'compra'
        , tipo: 'button'
        ,value: 0
        ,show:[ 'fa fa-2x text-white-50',
                'fa fa-2x text-white'
              ]
        ,qryName: 'Producto'
        ,qryValue: [{ $eq: true }]
        ,qryKey: 'pCompra'
        ,display: false
        ,text: 'C'
       }
       , {
        id: 'venta'
        , tipo: 'button'
        ,value: 1
        ,show:[ 'fa fa-2x text-white-50',
                'fa fa-2x text-white'
              ]
        ,qryName: 'Producto'
        ,qryValue: [{ $eq: true }]
        ,qryKey: 'pVenta'
        ,display: false
        ,text: 'V'
       }
    ]
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
    private list: ListasArtProdService,
    public printService: PrintService
  ) {}

  ngOnInit(): void {
    this.contiene['$gte'] = 0;
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

  makeQry (): any {
    const qry: any = {
      Articulo: {}
      ,Producto: {}
      ,Extra: {}
      ,searchItem: this.searchItem
    }

    const array = this.filterButtons;
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      switch (el.tipo) {
        case 'radioButton':
          for (let n = 0; n < el.buttons.length; n++) {
            const sb = el.buttons[n];
            if (sb.value > 0) {
              qry[sb.qryName][sb.qryKey] = sb.qryValue[sb.value-1];
            }
          }
          break;
        default:
          if (el.value > 0) {
            qry[el.qryName][el.qryKey] = el.qryValue[el.value-1];
          }
          break;
      }
    }
    console.log("qry",qry);
    return qry;
  }
  buttonMsg(array){
    console.log("Procesa Buttons Msg", array)
    this.filterButtons = array;
    this.searchProductos();
  }

  contieneMsg(array){
    console.log("Contiene Msg", array);
    this.contiene = array;
    //this.filterButtons = array;
    this.searchProductos();
  }

  Prod_filterEvent( ev ): void {
    for (const propName in ev) {
      this[propName] = ev[propName];
    }
    this.searchProductos();
  }

  listProductos(): void {
    this.searchProductos();
  }

  newReg(ev){
    console.log(ev)
  }
  selected( art ){
    console.log( art );
  }

  cambiaPrecio(ev){
    console.log(ev);
    this.fpagoCoef = ev.value;
    this.calculaPrecio();
  }
  calculaPrecio() {
    for (let i = 0; i < this.articuloList.length; i++) {
      const e:any = this.articuloList[i];
      if ( this.fpagoCoef === 1 ){
        if ( !e.pesable ){
          if ( e.calc_precio > 100 ){
            e.precioToShow = Math.ceil(e.calc_precio/10 * this.fpagoCoef)*10;
          } else {
            const diff = e.precio % 5;
            if (diff < 3 ){
              e.precioToShow = e.calc_precio - diff;
            } else {
              e.precioToShow = e.calc_precio + ( 5 - diff )
            }
          }
        } else {
          e.precioToShow = Math.ceil(e.calc_precio * this.fpagoCoef);
        }
      } else {
        e.precioToShow = Math.ceil(e.calc_precio * this.fpagoCoef);
      }
    }
  }
  imprimir(){
    const lsId = Date.now().toString();
    console.log(lsId);
    localStorage.setItem( lsId, JSON.stringify(this.articuloList));

    this.printService.printDocument('productlistprint', [lsId] );

  }
  async searchProductos() {
    if (this.wait) { return; }
    this.wait = true;
    const qry:any = this.makeQry();
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
    const searchItem: any = (qry ? qry.searchItem : "" );

    const Sort = this.articuloOrder[this.listaOrden].sort;
    Producto['contiene'] = this.contiene;
//    this.list.buscaProductos({Articulo, Producto, Extra, searchItem: this.searchItem, Sort })
    try {
      const data:any = await this.list.readData(
        `${this.ApiUri}/productos/list`,
        {Articulo, Producto, Extra, searchItem, Sort }
      );
      this.articuloList = data;
      console.log(this.articuloList);
      this.calculaPrecio();
    } catch (error) {
      console.log(error);
    }
    this.wait = false;
    /*
    this.list.readData(
      `${this.ApiUri}/productos/list`,
      {Articulo, Producto, Extra, searchItem, Sort }
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
          this.calculaPrecio()
        }
        this.wait = false;
        console.log(this.articuloList);
      },
      err => {
        console.log(err);
        this.wait = false;
      }
    );
    */
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
