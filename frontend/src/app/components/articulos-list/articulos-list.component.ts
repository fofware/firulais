import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/shared/uris';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';

@Component({
  selector: 'app-articulos-list',
  templateUrl: './articulos-list.component.html',
  styleUrls: ['./articulos-list.component.css']
})
export class ArticulosListComponent implements OnInit {
  wait: boolean = false;
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
          ,qryValue: [{$regex: { params:'gato', flags: 'i'}}]
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
          ,qryValue: [{$regex: { params:'ave', flags: 'i'}}]
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
/*
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
*/
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
    pesable: { value: false,  display: false, qry: true }
  , precio: { value: true, display: false,  qry: { $gt: 0 }}
  , stock:  { value: true, display: false,  qry: { $gte: 1 }}
  , servicio: { value: false, display: false, qry: {$eq: true} }
  , pCompra: { value: false, display: false, qry: { $eq: true }}
  , pVenta: { value: true, display: false, qry: { $eq: true }}
  , private_web: { value: true, display: true, qry: { $not: { $eq: true } } }
  };
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
  formula:any[] = [
    {id: 0, name: 'Proteína bruta (mín.)', value: '25,0%', show: true}
    ,{id: 1, name: 'Extracto etéreo / Grasa bruta (mín.)', value: '2.5%', show: false}
    ,{id: 2, name: 'Fibra bruta (máx.)', value: '12,0%', show: false}
    ,{id: 3, name: 'Minerales/Cenizas (máx.)', value: '8,0%', show: false}
    ,{id: 4, name: 'Calcio (mín./máx.)', value: '0,90%/1,4%', show: false}
  ]
  unidades: [{ id: any, name: string }];
  selectedArticulo: any;
  editedArticulo: any;

  closeModal: string;

  constructor(  private http: HttpClient,
                private modalService: NgbModal,
                private list: ListasArtProdService
              ) {
                  //this.list.filter = this.filter;
                }

  triggerModal(content) {
    this.modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title'
        , size: 'xl'
        //, windowClass: 'xlModal'
        , scrollable: true
        , centered: true
        , backdrop: false
      }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(this.closeModal);
      if (res == 'Save click'){
        this.articuloList[this.editedArticulo] = JSON.parse(JSON.stringify(this.selectedArticulo));
        this.editedArticulo = null;
        this.selectedArticulo = {};
      } else {
        console.log('No graba')
      }
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      console.log(this.closeModal)
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('by pressing ESC')
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('by clicking on a backdrop')
      return 'by clicking on a backdrop';
    } else {
      console.log(`with: ${reason}`)
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.listArticulos()
  }

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
    this.searchItem = ([] as any);
    this.searchArticulos();
  }

  newReg(ev){
    console.log("Add New Articulo")
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

  searchArticulos(): void {
    if (this.wait) { return; }
    this.wait = true;
    const qry:any = this.makeQry();
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
    const searchItem: any = (qry ? qry.searchItem : "" );
    const Sort = this.articuloOrder[this.listaOrden].sort;

//    this.list.buscaArticulos({Articulo, Producto, Extra, searchItem: this.searchItem, Sort })
    this.list.readData(
      `${API_URI}/articulos/productos/listdata`,
      {Articulo, Producto, Extra, searchItem: this.searchItem, Sort }
    ).subscribe(
      res => {
        //        this.calculaPrecios(res);
        const data = res as any;

        if ( data.length === 1 && Articulo['$and'] && Articulo['$and'].length === 1
        && ( this.searchItem === data[0].codigo || this.searchItem === data[0].plu ))
        {
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

  SelectEvent(ev,modalData){
    console.log("SelectEvent",ev);
    this.editedArticulo = ev.articulo;
    this.selectedArticulo = JSON.parse(JSON.stringify(ev.articulo));
    this.editedArticulo = ev.idx;
    this.prodList = this.selectedArticulo.productos;
    this.detalles = this.selectedArticulo.detalles || [];
//    this.formula = this.selectedArticulo.formula || [];

    this.unidades = [{ id: null, name: null }];

    for (let index = 0; index < this.prodList.length; index++) {
      const e = this.prodList[index];
      if(e.count_parte !== 0 && e.count_ins !== 0) // No se muestran los pesables ni las cajas o Packs
      {
        this.prodList[index].parentname = this.readParent(e.parent);
        const unid = { id: e._id, name: this.readParent(e._id) };
        this.prodList[index].infile = true;
        this.prodList[index].changed = false;
        if (!this.unidades) { this.unidades = [unid]; }
        else { this.unidades.push(unid); }
      }
    }
    this.triggerModal(modalData);
  }

  readParent(id: any, descr?: string) {
    if ( descr === undefined ) { descr = ''; }
    const item = this.findProduct(id);
    if (item._id) {
      if (`${item._id}` === `${item.parent}` || item.parent === undefined) { item.parent = null; }
      descr += `${item.name} ${item.contiene} ${item.unidad}`;
/*
      if (item.contiene && item.contiene > 1) { descr += `${item.name} ${item.contiene} ${item.unidad}`; }
      else if (item.unidad) { descr += `${item.name} ${item.unidad}`; }
      else { descr += `${item.name}`; }
*/
      if (item.parent != null) {
        descr = this.readParent(item.parent, descr);
      }
    }
    return descr.trim();
  }

  findProduct(id: any): any {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.prodList.length; index++) {
      const element: any = this.prodList[index];
      if (element._id === id) { return element; }
    }
    return {};
  }

}
