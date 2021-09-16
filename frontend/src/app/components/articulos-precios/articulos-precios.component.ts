import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { PrintService } from 'src/app/services/print.service';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-articulos-precios',
  templateUrl: './articulos-precios.component.html',
  styleUrls: ['./articulos-precios.component.css']
})
export class ArticulosPreciosComponent implements OnInit {

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
      id: 'seco'
      , tipo: 'button'
      ,value: 0
      ,show:[ 'fas fa-cloud-sun-rain fa-2x text-white-50',
              'fas fa-sun fa-2x text-warning',
              'fas fa-cloud-showers-heavy fa-2x text-info'
            ]
      ,qryName: 'Articulo'
      ,qryValue: [{$regex: { patern:'seco', flags: 'i'}},{$regex: { patern:'húmedo', flags: 'i'}}]
      ,qryKey: 'rubro'
      ,display: true
      ,text: ''
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
  ]

  articuloOrder = [
    {
      name: 'Descripción',
      vista: 1,
      sort: { fullName: 1, name: 1, contiene: 1  }
    },
    {
      name: 'Rubro/Linea',
      vista: 1,
      sort: { rubro: 1, Linea: 1, marca: 1, especie: 1, fullName: 1 }
    },
    {
      name: 'fabricante',
      vista: 1,
      sort: { fabricante: 1, marca: 1, especie: 1, rubro: 1, linea: 1, fullName: 1 }
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
/*
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
  */
  ];
  listaOrden = 0;
  showArticulos = true;
  publico = true;
  searchItem: string = '';
  cmpSetting = {
    tipo: 'Venta',
    public: true
  };
  articuloList: any[] = [];
  prodList: any[] = [];
  detalles: any[] = [];
  unidades: [{ id: any, name: string }];
  selectedArticulo: any;
  compareArticulo: any;
  editedArticulo: any;
  dialog: any;
  closeModal: string;
  user:any;
  wait: boolean;
  hoja = 1;
  pageSize = 9;
  collectionSize = 1;
  dbList = [];
  tmpList = [];

  constructor(  private http: HttpClient,
  //  private modalService: NgbModal,
    private list: ListasArtProdService,
    private authService: AuthService,
//    route: ActivatedRoute,
    public printService: PrintService
  ) {
/*
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
*/
    this.user = this.authService.user;
    console.log(this.user);
  }

  ngOnInit(): void {
    this.listArticulos()
  }

/*
  ngOnChanges(changes: SimpleChanges){
    console.log('Articulos ONCHANGES');
    console.log(changes);
  }
*/
  filterEvent(ev){
    for (const propName in ev) {
      console.log(propName, ev[propName]);
      this[propName] = ev[propName];
    }
    //  this.searchItem = event.searchItem;
    //  this.filter = event.filter;
    this.searchArticulos();
  }

  listArticulos(): void {
//    this.searchItem = ([] as any);
    this.searchArticulos();
  }
  async searchArticulos() {
    if (this.wait) { return; }
    this.wait = true;
    const qry:any = this.makeQry();
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
    const searchItem: any = (qry ? qry.searchItem : "" );
    const Sort = this.articuloOrder[this.listaOrden].sort;

    try {
      const data:any = await this.list.readData(
        `${API_URI}/articulos/productos/listpublicdata`,
        {Articulo, Producto, Extra, searchItem: this.searchItem, Sort }
      );
      console.log(data);
      this.dbList = data;
      this.tmpList = data;
      this.hoja = 1;
      this.collectionSize = this.tmpList.length;
      this.articuloList = this.more(this.tmpList, [])
      console.log(this.articuloList);
    } catch (error) {
      console.log(error);
    }
    this.wait = false;
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
    this.searchArticulos();
  }
  imprimir(){
    const lsId = Date.now().toString();
    console.log(lsId);
    localStorage.setItem( lsId, JSON.stringify(this.articuloList));

//    this.printService.printDocument('articulospreciosprint', [lsId] );

    this.printService.printDocument('articulosreventaprint', [lsId] );

  }
  more(inList,outList): any {
    console.log(this.hoja);
      console.log((this.hoja-1) * this.pageSize);
      console.log(this.hoja * this.pageSize);
      this.collectionSize = inList.length;
      outList = outList.concat(inList.slice((this.hoja-1) * this.pageSize , this.hoja * this.pageSize));
      this.hoja=this.hoja+1;
      return outList;
  }
}
