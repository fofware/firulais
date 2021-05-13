import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { API_URI } from 'src/app/shared/uris';
import {ModalDismissReasons, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { ObjectID } from 'bson'
import { ArticuloFormComponent } from '../articulo-form/articulo-form.component';

@Component({
  selector: 'app-articulos-list',
  templateUrl: './articulos-list.component.html',
  styleUrls: ['./articulos-list.component.css']
})
export class ArticulosListComponent implements OnInit {
  wait: boolean = false;
  modalsNumber = 0;
  newArticulo = {
    _id: new ObjectID(),
    fabricante: '',
    marca: '',
    rubro: '',
    linea: '',
    especie: '',
    edad: '',
    raza: '',
    name: '',
    d_fabricante: false,
    d_marca: false,
    d_rubro: false,
    d_linea: false,
    d_especie: false,
    d_edad: false,
    d_raza: false,
    private_web: false,
    image: '',
    url: '',
    iva: 0,
    margen: 23,
    tags: '',
    formula: [],
    detalles: [],
    beneficios: []
  }
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
  beneficios: any[] = [
    {_id: 0, name: 'Omega 3 y 6', value: 'Ayudan a mantener un pelaje saludable', show: false}
    ,{_id: 1, name: 'Croqueta Parti-crock', value: 'Mayor disfrute', show: false}
    ,{_id: 2, name: 'Taurina', value: 'Contribuye a la salud del corazón y la visión', show: false}
    ,{_id: 3, name: 'Protección urinaria', value: 'pH óptimo que ayuda a evitar la formación de cálculos urinarios', show: true}
    ,{_id: 4, name: 'Fibras naturales', value: 'Colaboran con el control de las bolas de pelo.', show: true}
  ]
  formula:any[] = [
    {id: 0, name: 'Proteína bruta (mín.)', showname: true, value: '30,0%', showvalue: true}
    ,{id: 1, name: 'Extracto etéreo / Grasa bruta (mín.)', showname: false, value: '2.5%', showvalue: false}
    ,{id: 2, name: 'Fibra bruta (máx.)', showname: false, value: '12,0%', showvalue: false}
    ,{id: 3, name: 'Minerales/Cenizas (máx.)', showname: false, value: '8,0%', showvalue: false}
    ,{id: 4, name: 'Calcio (mín./máx.)', showname: false, value: '0,90%/1,4%', showvalue: false}
  ]
  unidades: [{ id: any, name: string }];
  selectedArticulo: any;
  compareArticulo: any;
  editedArticulo: any;
  dialog: any;
  closeModal: string;

  constructor(  private http: HttpClient,
                private modalService: NgbModal,
                private list: ListasArtProdService
              ) {
                this.modalService.activeInstances.subscribe((list) => {
                  this.modalsNumber = list.length;
                });
              }
/*
  triggerModal(content) {
    this.modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title'
        , size: 'xl'
        , beforeDismiss: () => {
          console.log("BeforeDisMiss");
          const ret: boolean = this.checkData();
          return ret;
        }
        //, windowClass: 'xlModal'
        , scrollable: true
        , centered: true
        , backdrop: false
      }).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
        console.log(this.closeModal);
        if (res == 'Save'){
          this.articuloList[this.editedArticulo] = JSON.parse(JSON.stringify(this.selectedArticulo));
          this.editedArticulo = null;
          this.selectedArticulo = {};
        } else {
          console.log('No graba')
        }
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        console.log(this.closeModal)
      }
    );
  }
  beforeDismiss(): boolean | Promise<boolean>{
    console.log("Dismiss")
    return false;
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
*/
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
    this.selectedArticulo = this.newArticulo;
//    this.triggerModal(modalData);
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

  async searchArticulos() {
    if (this.wait) { return; }
    this.wait = true;
    const qry:any = this.makeQry();
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
    const searchItem: any = (qry ? qry.searchItem : "" );
    const Sort = this.articuloOrder[this.listaOrden].sort;

    //    this.list.buscaArticulos({Articulo, Producto, Extra, searchItem: this.searchItem, Sort })
    try {
      const data:any = await this.list.readData(
        `${API_URI}/articulos/productos/listdata`,
        {Articulo, Producto, Extra, searchItem: this.searchItem, Sort }
      );
      /*
      if ( data.length === 1 && Articulo['$and'] && Articulo['$and'].length === 1
      && ( this.searchItem === data[0].codigo || this.searchItem === data[0].plu ))
      {
        this.searchItem = '';
        this.wait = false;
        this.searchArticulos();
      } else {
      */
        this.articuloList = data;
      //}
      console.log(this.articuloList);
    } catch (error) {
      console.log(error);
    }
    this.wait = false;
    /*
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
    */
  }

  SelectEvent(ev,modalData){
    this.editedArticulo = ev.idx;

    if(!this.articuloList[this.editedArticulo].formula) this.articuloList[this.editedArticulo].formula = [];
    if(!this.articuloList[this.editedArticulo].detalles) this.articuloList[this.editedArticulo].detalles = [];
    if(!this.articuloList[this.editedArticulo].beneficios) this.articuloList[this.editedArticulo].beneficios = [];
    if(!this.articuloList[this.editedArticulo].productos) this.articuloList[this.editedArticulo].productos = [];

    this.selectedArticulo = JSON.parse(JSON.stringify(this.articuloList[ev.idx]));
//    this.compareArticulo = JSON.parse(JSON.stringify(this.selectedArticulo));
//    this.prodList = JSON.parse(JSON.stringify(this.selectedArticulo.productos));
//    this.detalles = this.selectedArticulo.detalles;
//    this.formula = this.selectedArticulo.formula;

//    this.unidades = [{ id: null, name: null }];
/*
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
*/
    const modalRef = this.modalService.open(ArticuloFormComponent, {
      ariaLabelledBy: 'modal-basic-title'
      , size: 'xl'
      , beforeDismiss: () => {
        console.log("BeforeDisMiss");
        const ret: boolean = modalRef.componentInstance.checkData();
        return ret;
      }
      //, windowClass: 'xlModal'
      , scrollable: true
      , centered: false
      , backdrop: false
    });
    modalRef.componentInstance.selectedArticulo = this.selectedArticulo;
//    this.triggerModal(modalData);
  }


}
