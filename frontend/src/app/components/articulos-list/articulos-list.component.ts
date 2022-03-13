import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_URI } from 'src/app/shared/uris';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { ObjectID } from 'bson'
import { ArticuloFormComponent } from '../articulo-form/articulo-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { PrintService } from 'src/app/services/print.service';
import { IdService } from 'src/app/services/id.service';

@Component({
  selector: 'app-articulos-list',
  templateUrl: './articulos-list.component.html',
  styleUrls: ['./articulos-list.component.css']
})
export class ArticulosListComponent implements OnInit {
  wait: boolean = false;
  modalsNumber = 0;
  newArticulo = {
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
    beneficios: [],
    productos:[]
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
      name: 'Lista',
      vista: 1,
      sort: { fabricante: 1, marca: 1, especie: 1, rubro: 1, linea: 1, edad: -1  }
    },
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
  previusArticulo: any;
  compareArticulo: any;
  editedArticulo: any;
  dialog: any;
  closeModal: string;
  user:any;
  constructor(  private http: HttpClient,
                private modalService: NgbModal,
                private list: ListasArtProdService,
                public printService: PrintService,
                private authService: AuthService,
                private idServive: IdService
              ) {
                this.modalService.activeInstances.subscribe((list) => {
                  this.modalsNumber = list.length;
                });
                this.user = this.authService.user;
                console.log(this.user);
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
//    this.searchItem = ([] as any);
    this.searchArticulos();
  }

  setprevius(){

  }
  async newReg(ev){
    console.log("Add New Articulo")
    console.log(this.newArticulo);
    this.selectedArticulo = Object.assign({},this.newArticulo);
    this.selectedArticulo._id = `${new ObjectID()}`; //await this.idServive.generate();
    //const newArticulo = this.modalService.open(ArticuloFormAddModalComponent);
    console.log("Selected",this.selectedArticulo);
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
    modalRef.componentInstance.newReg = true;
    modalRef.componentInstance.user = this.user
    modalRef.componentInstance.selectedArticulo = this.selectedArticulo;
    modalRef.componentInstance.previusArticulo = this.previusArticulo;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        if (result === 'Save'){
          this.previusArticulo = Object.assign({},modalRef.componentInstance.selectedArticulo);
          this.articuloList.push(modalRef.componentInstance.selectedArticulo);
        }
      }
    });
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

    try {
      const data:any = await this.list.readData(
        `${API_URI}/articulos/productos/listdata`,
        {Articulo, Producto, Extra, searchItem: this.searchItem, Sort }
      );
      this.articuloList = data;
      console.log(this.articuloList);
    } catch (error) {
      console.log(error);
    }
    this.wait = false;
  }

  SelectEvent(ev,modalData){
    this.editedArticulo = ev.idx;
    if(!this.articuloList[this.editedArticulo].formula) this.articuloList[this.editedArticulo].formula = [];
    if(!this.articuloList[this.editedArticulo].detalles) this.articuloList[this.editedArticulo].detalles = [];
    if(!this.articuloList[this.editedArticulo].beneficios) this.articuloList[this.editedArticulo].beneficios = [];
    if(!this.articuloList[this.editedArticulo].productos) this.articuloList[this.editedArticulo].productos = [];

    this.selectedArticulo = JSON.parse(JSON.stringify(this.articuloList[ev.idx]));

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
    modalRef.componentInstance.newReg = false;
    modalRef.componentInstance.user = this.user;
    modalRef.result.then( res => {
      this.previusArticulo = modalRef.componentInstance.selectedArticulo;
      console.log(res);
      console.log(this.previusArticulo);
      if(res === 'Save'){
        //console.log(modalRef.componentInstance.selectedArticulo);
        this.articuloList[this.editedArticulo] = modalRef.componentInstance.selectedArticulo;
      }
    });
  }

  imprimir(){
    const lsId = Date.now().toString();
    console.log(lsId);
    localStorage.setItem( lsId, JSON.stringify(this.articuloList));

    this.printService.printDocument('articuloslistprint', [lsId] );

  }

}
