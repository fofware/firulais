import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { CsvfileService } from 'src/app/services/csvfile.service';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { tpLista } from 'src/app/shared/toolbox';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-cargalistas',
  templateUrl: './cargalistas.component.html',
  styleUrls: ['./cargalistas.component.css']
})
export class CargalistasComponent implements OnInit, OnChanges {

  ApiUri = API_URI;
  wait = false;
  searchItem = '';
  lista = tpLista;
  cmpSetting = {
    tipo: 'Compra',
    public: false
  };
  selectedIdx: number = null;

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
            ,qryValue: [{$regex: { params:'perro', flags: 'i'}}]
            ,qryKey: 'especie'
            ,display: false
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
            ,qryValue: [{$regex: { params:'gato', flags: 'i'}}]
            ,qryKey: 'especie'
            ,display: false
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
            ,qryValue: [{$regex: { params:'ave', flags: 'i'}}]
            ,qryKey: 'especie'
            ,display: false
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
            ,qryValue: [{$regex: { params:'pez', flags: 'i'}}]
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
            ,qryValue: [{$regex: { params:'caballo', flags: 'i'}}]
            ,qryKey: 'especie'
            ,display: false
            ,text: ''
          }

        ]
      }
      , {
        id: 'pesable'
        , tipo: 'button'
        ,value: 2
        ,show:[ 'fa fa-balance-scale fa-2x text-white-50',
                'fa fa-balance-scale fa-2x text-white',
                'fa fa-balance-scale fa-2x text-danger'
              ]
        ,qryName: 'Producto'
        ,qryValue: [true, { $not: { $eq: true } }]
        ,qryKey: 'pesable'
        ,display: false
        ,text: ''
       }
       , {
        id: 'private_web'
        , tipo: 'button'
        ,value: 0
        ,show:[ 'fas fa-prescription fa-2x text-white',
                'fas fa-prescription fa-2x text-white-50'
              ]
        ,qryName: 'Articulo'
        ,qryValue: [{ $not: { $eq: true } }]
        ,qryKey: 'private_web'
        ,display: false
        ,text: ''
       }
       , {
        id: 'precio'
        , tipo: 'button'
        ,value: 0
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
        ,value: 0
        ,show:[ 'fa fa-shopping-cart fa-2x text-white-50',
                'fa fa-shopping-cart fa-2x text-white'
              ]
        ,qryName: 'Extra'
        ,qryValue: [{ $gte: 1 }]
        ,qryKey: 'stock'
        ,display: false
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
        ,value: 1
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
        ,value: 0
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

  encode = 'iso8859-3'
  data = []
  fields = []
  fieldsType = [
    'codigoProveedor'
    ,'descripcion'
    ,'precio'
    ,'fabricante'
    ,'marca'
    ,'rubro'
    ,'linea'
    ,'especie'
    ,'edad'
    ,'raza'
    ,'contiene'
    ,'unidad'
    ,'bultocontiene'
  ]

  typeValues = [];

  constructor(
    private csv: CsvfileService,
    private http: HttpClient,
    private list: ListasArtProdService
   ) { }

  ngOnInit(): void {
    this.setHeight();

  }

  ngOnChanges(changes): void {
    console.log(changes);
    //    console.log('PROD-LIST-PUBLIC OnChanges');
    /*
        console.log(changes);
        for (const propName in changes) {
          console.log(propName, changes[propName]);
    //      this.changePrecio();
        }
    */

  }

  async setHeight(){
    const element = document.getElementsByTagName('html');
    const h = document.getElementsByTagName('html')[0].clientHeight - 220 - 61;
    const b = h-10;
    document.getElementById('main').style.height=`${h}px`;
  }

  onResize(event){
    this.setHeight();
  }

  async gotData(event): Promise<void> {
    this.data = await this.csv.formatData(event.data);
    this.fields = this.csv.fields;
    this.typeValues = this.csv.fieldsValues;
    console.log(this.data);
  }

  selectedlista(idx?:number){
    this.selectedIdx = idx;
    this.bucarProductos();
  }

  bucarProductos(){
    const reg = this.csv.getreg(this.selectedIdx);
    if(reg.descripcion){
      this.searchItem = reg.descripcion;
//      searchItem = reg.descripcion;
    }
    const qry:any = this.makeQry();
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
    let searchItem: any = (qry ? qry.searchItem : "" );
    const Sort = this.articuloOrder[this.listaOrden].sort;
/*
    if(reg.descripcion){
      this.searchItem = reg.descripcion;
//      searchItem = reg.descripcion;
    }
*/
    if(reg.fabricante) Articulo['fabricante'] = {$regex: { params: reg.fabricante, flags: 'i'}};
    if(reg.marca) Articulo['marca'] = {$regex: { params: reg.marca, flags: 'i'}};
    if(reg.rubro) Articulo['rubro'] = {$regex: { params: reg.rubro, flags: 'i'}};
    if(reg.linea) Articulo['linea'] = {$regex: { params: reg.linea, flags: 'i'}};
    if(reg.especie) Articulo['especie'] = {$regex: { params: reg.especie, flags: 'i'}};
    if(reg.edad) Articulo['edad'] = {$regex: { params: reg.edad, flags: 'i'}};
    if(reg.raza) Articulo['raza'] = {$regex: { params: reg.raza, flags: 'i'}};
//    Producto['pCompra'] = { $eq: true }
    if(reg.bultocontiene && reg.contiene){
      if(reg.bultocontiene == 1){
        if(reg.contiene) Extra['contiene'] = { $eq: reg.contiene };
      } else {
        Extra['contiene'] = { $eq: reg.bultocontiene };
        if(reg.contiene) Extra['scontiene'] = { $eq: reg.bultocontiene };
      }
    }
    try {
      const data:any = this.list.readData(
        `${this.ApiUri}/productos/list`,
        {Articulo, Producto, Extra, searchItem, Sort }
      );
      this.articuloList = data;
      console.log(this.articuloList);
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
        const data = res as any;
        this.articuloList = data;
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

  /*********************************/
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

  Prod_filterEvent( ev ): void {
    for (const propName in ev) {
      this[propName] = ev[propName];
    }
    this.bucarProductos();
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

  searchProductos(): void {
    if (this.wait) { return; }
    this.wait = true;
    const qry:any = this.makeQry();
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
    const searchItem: any = (qry ? qry.searchItem : "" );
    const Sort = this.articuloOrder[this.listaOrden].sort;
    try {
      const data:any = this.list.readData(
        `${this.ApiUri}/productos/list`,
        {Articulo, Producto, Extra, searchItem, Sort }
      );
      this.articuloList = data;
      console.log(this.articuloList);
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
        const data = res as any;
        if ( data.length === 1 && Articulo['$and'] && Articulo['$and'].length === 1
        && ( this.searchItem === data[0].codigo || this.searchItem === data[0].plu ))
        {
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
        this.wait = false;
      }
    );
    */
  }

}
