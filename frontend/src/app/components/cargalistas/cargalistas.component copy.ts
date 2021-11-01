import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isString } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ftruncate } from 'fs';
import { ignoreElements } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';
import { IPersonas } from 'src/app/models/i-personas';
import { CsvfileService } from 'src/app/services/csvfile.service';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { ListasProveedoresService, proveedoresSettings } from 'src/app/services/listas-proveedores.service';
import { PersonasService } from 'src/app/services/personas.service';
import { round } from 'src/app/shared/toolbox';
import { API_URI } from 'src/app/shared/uris';
import { ReadCsvFileModalComponent } from '../read-csv-file-modal/read-csv-file-modal.component';
import { ReadFileModalComponent } from '../read-file-modal/read-file-modal.component';
import { ReadXlsxFileModalComponent } from '../read-xlsx-file-modal/read-xlsx-file-modal.component';

@Component({
  selector: 'app-cargalistas',
  templateUrl: './cargalistas.component.html',
  styleUrls: ['./cargalistas.component.css']
})
export class CargalistasComponent implements OnInit, OnChanges {
  provSettings = proveedoresSettings;
  ApiUri = API_URI;
  wait = false;
  searchItem = '';
//  lista = tpLista;
  cmpSetting = {
    tipo: 'Compra',
    public: false
  };
  selectedIdx: number = null;
  selectedReg: any = {};
  articuloList: any[] = [];
  dbList: any[] = [];
/*
  filterButtons = [
    {
      id: 'especie'
      , tipo: 'radioButton'
      , buttons: [
        {
          id: 'perro'
          , value: 0
          , show: [
            'fas fa-dog fa-2x text-white-50'
            , 'fas fa-dog fa-2x text-white'
          ]
          , qryName: 'Articulo'
          , qryValue: [{ $regex: { params: 'perro', flags: 'i' } }]
          , qryKey: 'especie'
          , display: false
          , text: ''
        }
        , {
          id: 'gato'
          , value: 0
          , show: [
            'fas fa-cat fa-2x text-white-50'
            , 'fas fa-cat fa-2x text-white'
          ]
          , qryName: 'Articulo'
          , qryValue: [{ $regex: { params: 'gato', flags: 'i' } }]
          , qryKey: 'especie'
          , display: false
          , text: ''
        }
        , {
          id: 'aves'
          , value: 0
          , show: [
            'fas fa-dove fa-2x text-white-50'
            , 'fas fa-dove fa-2x text-white'
          ]
          , qryName: 'Articulo'
          , qryValue: [{ $regex: { params: 'ave', flags: 'i' } }]
          , qryKey: 'especie'
          , display: false
          , text: ''
        }
        , {
          id: 'pez'
          , value: 0
          , show: [
            'fas fa-fish fa-2x text-white-50'
            , 'fas fa-fish fa-2x text-white'
          ]
          , qryName: 'Articulo'
          , qryValue: [{ $regex: { params: 'pez', flags: 'i' } }]
          , qryKey: 'especie'
          , display: false
          , text: ''
        }
        , {
          id: 'caballo'
          , value: 0
          , show: [
            'fas fa-horse fa-2x text-white-50'
            , 'fas fa-horse fa-2x text-white'
          ]
          , qryName: 'Articulo'
          , qryValue: [{ $regex: { params: 'caballo', flags: 'i' } }]
          , qryKey: 'especie'
          , display: false
          , text: ''
        }

      ]
    }
    , {
      id: 'pesable'
      , tipo: 'button'
      , value: 2
      , show: ['fa fa-balance-scale fa-2x text-white-50',
        'fa fa-balance-scale fa-2x text-white',
        'fa fa-balance-scale fa-2x text-danger'
      ]
      , qryName: 'Producto'
      , qryValue: [true, { $not: { $eq: true } }]
      , qryKey: 'pesable'
      , display: false
      , text: ''
    }
    , {
      id: 'private_web'
      , tipo: 'button'
      , value: 0
      , show: ['fas fa-prescription fa-2x text-white',
        'fas fa-prescription fa-2x text-white-50'
      ]
      , qryName: 'Articulo'
      , qryValue: [{ $not: { $eq: true } }]
      , qryKey: 'private_web'
      , display: false
      , text: ''
    }
    , {
      id: 'precio'
      , tipo: 'button'
      , value: 0
      , show: ['fas fa-file-invoice-dollar fa-2x text-white-50',
        'fas fa-file-invoice-dollar fa-2x text-white'
      ]
      , qryName: 'Extra'
      , qryValue: [{ $gte: 1 }]
      , qryKey: 'precio'
      , display: false
      , text: ''
    }
    , {
      id: 'stock'
      , tipo: 'button'
      , value: 0
      , show: ['fa fa-shopping-cart fa-2x text-white-50',
        'fa fa-shopping-cart fa-2x text-white'
      ]
      , qryName: 'Extra'
      , qryValue: [{ $gte: 1 }]
      , qryKey: 'stock'
      , display: false
      , text: ''
    }
    , {
      id: 'servicio'
      , tipo: 'button'
      , value: 0
      , show: ['fa fa-2x text-white-50',
        'fa fa-2x text-white'
      ]
      , qryName: 'Producto'
      , qryValue: [{ $eq: true }]
      , qryKey: 'servicio'
      , display: false
      , text: 'S'
    }
    , {
      id: 'compra'
      , tipo: 'button'
      , value: 1
      , show: ['fa fa-2x text-white-50',
        'fa fa-2x text-white'
      ]
      , qryName: 'Producto'
      , qryValue: [{ $eq: true }]
      , qryKey: 'pCompra'
      , display: false
      , text: 'C'
    }
    , {
      id: 'venta'
      , tipo: 'button'
      , value: 0
      , show: ['fa fa-2x text-white-50',
        'fa fa-2x text-white'
      ]
      , qryName: 'Producto'
      , qryValue: [{ $eq: true }]
      , qryKey: 'pVenta'
      , display: false
      , text: 'V'
    }
  ]
  */
  /*
  articuloOrder = [
    {
      name: 'Descripción',
      vista: 1,
      sort: { art_name: 1, name: 1, contiene: 1, unidad: 1, 'sub.name': 1, 'sub.contiene': 1, 'sub.unidad': 1 }
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
*/
  listaOrden = 0;
  showArticulos = true;
  showStock = true;

  encode = 'iso8859-3'
  data = []
  fields = []
  id_proveedor: object;
  codigo_proveedor: String;
  codigo_ean: string;
  fecha: object;
  registro: string;
  fabricante?: string;
  marca?: string;
  especie?: string;
  edad?: string;
  raza?: string;
  rubro?: string;
  linea?: string;
  descripcion?: string;
  bulto?: number;
  contiene?: number;
  precio_lista: number;
  precio_final: number;
  id_articulo?: object;
  id_producto?: object;

  fieldsType = [
    '_id'
    , 'id_proveedor'
    , 'codigo_proveedor'
    , 'codigo_ean'
    , 'fecha'
    , 'fabricante'
    , 'marca'
    , 'especie'
    , 'edad'
    , 'raza'
    , 'rubro'
    , 'linea'
    , 'descripcion'
    , 'bulto'
    , 'contiene'
    , 'precio_lista'
    , 'coef_descuento'
    , 'coef_retenciones'
    , 'precio_final'
    , 'status'
  ]

  typeValues = [];
  listas = {
    fabricante: []
    , marca: []
    , especie: []
    , edad: []
    , raza: []
    , rubro: []
    , linea: []
  }
  modalsNumber = 0;
  dbPersonas: IPersonas[];
  proveedor = 0;
  newData:any = [];
  errorData:any = [];

  page = 1;
  pageSize = 15;
  collectionSize = 0;

  constructor(
    private csv: CsvfileService,
    private http: HttpClient,
    private list: ListasArtProdService,
    private personas: PersonasService,
    private modalService: NgbModal,
    private procesaLista: ListasProveedoresService
  ) {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  ngOnInit(): void {
    this.setHeight();
    this.initData();
//    console.log(this.articuloList);
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

//  readFileSciarriello(){
//    console.log("Read File")
//    const modalRef = this.modalService.open(ReadFileModalComponent, {
//      ariaLabelledBy: 'modal-basic-title'
//      , size: 'xl'
//      /*
//            , beforeDismiss: () => {
//              console.log("BeforeDisMiss");
//              const ret: boolean = modalRef.componentInstance.checkData();
//              return ret;
//            }
//      */
//      //, windowClass: 'xlModal'
//      , scrollable: true
//      , centered: false
//      , backdrop: true
//    });
//    modalRef.componentInstance.encode = this.encode;
//    modalRef.result.then((result) => {
//      if (result) {
//        console.log(result);
//        const validata = []
//        if (result === 'load') {
//          const data: any = modalRef.componentInstance.data.split('\n');
//          data.map((line: string) => {
//            if (line.search('[$]') > -1) {
//              line = line.replace(/,/g, '');
//              const capturingRegexText = /(?<Name>[A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)(?<contiene>[0-9]*)(?:\s)(?<unidad>:[A-Za-Z]*)[ ][$](?<lista>[0-9.]*)[$ ]*(?<medio>[0-9.]*)[$ ]*(?<full>[0-9.]*)/;
//              // SABROSITOS GATO MIX 4 UNI X 3 KGS $1631 $1694
//              // SABROSITOS GATO MIX 10 KGS $1308 $1341
//              const reg = line.match(capturingRegexText);
//              if (reg) validata.push(reg);
//              else this.errorData.push(line);
//            }
//          })
//          for (let index = 0; index < validata.length; index++) {
//            const reg = validata[index];
//            const obj = reg.groups;
//            if (obj.lista === "") obj.lista = 0;
//            else obj.lista = parseFloat(obj.lista);
//            if (obj.medio === "") obj.medio = obj.lista;
//            else obj.medio = parseFloat(obj.medio);
//            if (obj.full === "") {
//              obj.full = obj.medio;
//              obj.medio = obj.lista;
//            } else obj.full = parseFloat(obj.full);
////            let bulto = obj.Name.match(/([A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)([0-9]*)\s[xX]$|([A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)[xX]$/);
//            const coso = obj.Name.match(/([A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)([0-9]*)\s[xX]$|([A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)[xX]$/);;
//            if(coso){
//              obj.Name = coso[1] || coso[3]
//              const cosito = coso[1].match(/([0-9]*)([ ]*)([a-zA-ZñÑáéíóúÁÉÍÓÚÜü]*)$/)
////              obj.coso = coso;
////              obj.cosito = cosito;
//              if(cosito[1] === ""){
//                obj.bulto = 1;
//              } else {
//                obj.bulto = parseFloat(cosito[1] || "1")
//                obj.Name = obj.Name.replace(cosito[1],'').trim()
//              }
//            } else obj.bulto = 1
//            obj.proveedor = this.proveedor;
//            obj.contiene = parseFloat(obj.contiene);
//            if (!obj.codigo) obj.codigo = `${obj.Name} ${obj.contiene} ${obj.unidad}`
//            obj.reposocion = Math.ceil((obj.full / 1.21 * 1.245)*100)/100;
//          }
//          this.newData = validata;
//          this.collectionSize = this.newData.length;
//          console.log(this.newData);
//          console.log(this.errorData);
//        }
//      }
//    });
//  }
  readTxt(proveedor:string) {
    console.log("Read File")
    const modalRef = this.modalService.open(ReadFileModalComponent, {
      ariaLabelledBy: 'modal-basic-title'
      , size: 'xl'
      /*
            , beforeDismiss: () => {
              console.log("BeforeDisMiss");
              const ret: boolean = modalRef.componentInstance.checkData();
              return ret;
            }
      */
      //, windowClass: 'xlModal'
      , scrollable: true
      , centered: false
      , backdrop: true
    });
    modalRef.componentInstance.encode = this.encode;
    modalRef.result.then( async (result) => {
      if (result) {
        console.log(result);
        const validata = []
        if (result === 'load') {
          //const retData = this.procesaLista[proveedor](modalRef.componentInstance.data)
          this.newData = await this.procesaLista[proveedor](modalRef.componentInstance.data)
          this.collectionSize = this.newData.length;
          console.log(this.newData);
        }
      }
    });
  }

  readFileButter() {
    console.log("Read File")
    const modalRef = this.modalService.open(ReadFileModalComponent, {
      ariaLabelledBy: 'modal-basic-title'
      , size: 'xl'
      /*
            , beforeDismiss: () => {
              console.log("BeforeDisMiss");
              const ret: boolean = modalRef.componentInstance.checkData();
              return ret;
            }
      */
      //, windowClass: 'xlModal'
      , scrollable: true
      , centered: false
      , backdrop: true
    });
    modalRef.componentInstance.encode = this.encode;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        const validata = []
        if (result === 'load') {
          const data: any = modalRef.componentInstance.data.split('\n');
          data.map((line: string) => {
            if (line.search('[$]') > -1) {
              line = line.replace(/,/g, '');
              const capturingRegexText = /(?<Name>[A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)(?<bulto>[0-9]*)(?:\s)(?:[xX]?)(?:\s*)(?<contiene>[0-9.]*)[ ](?<unidad>[A-Za-z]*)[ ][$][ ](?<lista>[0-9.]*)[$ ]*(?<medio>[0-9.]*)[$ ]*(?<full>[0-9.]*)/;
              const reg = line.match(capturingRegexText);
              if (reg) validata.push(reg.groups);
              else this.errorData.push(line);
            }
          })
          for (let index = 0; index < validata.length; index++) {
            const reg = validata[index];
            const obj = reg;
            if (obj.lista === "") obj.lista = 0;
            else obj.lista = parseFloat(obj.lista);
            if (obj.medio === "") obj.medio = obj.lista;
            else obj.medio = parseFloat(obj.medio);
            if (obj.full === "") {
              obj.full = obj.medio;
              obj.medio = obj.lista;
            } else obj.full = parseFloat(obj.full);
            const coso = obj.Name.match(/([A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)([0-9]*)\s[xX]$|([A-Za-z0-9+-_ñÑáéíóúÁÉÍÓÚÜü ]*)[xX]$/);;
            if(coso){
              obj.Name = coso[1] || coso[3]
              const cosito = coso[1].match(/([0-9]*)([ ]*)([a-zA-ZñÑáéíóúÁÉÍÓÚÜü]*)$/)
//              obj.coso = coso;
//              obj.cosito = cosito;
              if(cosito[1] === ""){
                obj.bulto = 1;
              } else {
                obj.bulto = parseFloat(cosito[1] || "1")
                obj.Name = obj.Name.replace(cosito[1],'').trim()
              }
            } else obj.bulto = 1
            obj.proveedor = this.proveedor;
            obj.contiene = parseFloat(obj.contiene);
            if (!obj.codigo) obj.codigo = `${obj.Name} ${obj.contiene} ${obj.unidad}`
            obj.reposicion = Math.ceil((obj.full / 1.21 * 1.245)*100)/100;
          }
          this.newData = validata;
          this.collectionSize = this.newData.length;
          console.log(this.newData);
          console.log(this.errorData);
        }
      }
    });
  }
/*
  inewReg(ev){
    console.log("Add New Articulo")
    this.selectedArticulo = this.newArticulo;
    this.selectedArticulo._id = new ObjectID();

    //const newArticulo = this.modalService.open(ArticuloFormAddModalComponent);
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
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        if (result === 'Save'){
          this.articuloList.push(modalRef.componentInstance.selectedArticulo);
        }
      }
    });
  }
*/
  readFileCSV() {
    console.log("Read File")
    const modalRef = this.modalService.open(ReadCsvFileModalComponent, {
      ariaLabelledBy: 'modal-basic-title'
      , size: 'xl'
      /*
            , beforeDismiss: () => {
              console.log("BeforeDisMiss");
              const ret: boolean = modalRef.componentInstance.checkData();
              return ret;
            }
      */
      //, windowClass: 'xlModal'
      , scrollable: true
      , centered: false
      , backdrop: true
    });
    modalRef.componentInstance.encode = this.encode;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });

  }
  readLista(){
    console.log("selccionado",this.proveedor)
    console.log(this.provSettings[this.proveedor])
    const prove = this.provSettings[this.proveedor];
    if(prove.type === "XLSX"){
      console.log("Read File")
      const modalRef = this.modalService.open(ReadXlsxFileModalComponent, {
        ariaLabelledBy: 'modal-basic-title'
        , size: 'xl'
        /*
              , beforeDismiss: () => {
                console.log("BeforeDisMiss");
                const ret: boolean = modalRef.componentInstance.checkData();
                return ret;
              }
        */
        //, windowClass: 'xlModal'
        , scrollable: true
        , centered: false
        , backdrop: true
      });
      modalRef.componentInstance.named = prove.named;
      modalRef.componentInstance.encode = prove.encode;
      modalRef.result.then(async (result) => {
        if (result) {
          console.log(this.newData);
          console.log(result.wb)
          this.data = await this.procesaLista[prove.type](prove,result.wbData)
          this.newData = this.data;
          this.collectionSize = this.newData.length;
        }
      });

    }
  }

  async importArticulos(){
    for (const reg of this.newData) {
      const rpta:any = await this.procesaLista.addProducto(reg);
      console.log(rpta);
    }
  }

  readXlsxFile(proveedor) {
    console.log("Read File")
    const modalRef = this.modalService.open(ReadXlsxFileModalComponent, {
      ariaLabelledBy: 'modal-basic-title'
      , size: 'xl'
      /*
            , beforeDismiss: () => {
              console.log("BeforeDisMiss");
              const ret: boolean = modalRef.componentInstance.checkData();
              return ret;
            }
      */
      //, windowClass: 'xlModal'
      , scrollable: true
      , centered: false
      , backdrop: true
    });
    modalRef.componentInstance.named = false;
    modalRef.componentInstance.encode = this.encode;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result.wb)
        this.xlsxToTable(proveedor,result.wbData)
      }
    });
  }
  xlsxToTable(proveedor,src) {
//    console.log('xlsx', src);
/*
    this.data = [];
    for (const key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        const hoja = src[key];
        for (let i = 0; i < hoja.length; i++) {
          const e = hoja[i];
          e['hoja'] = key;
          this.data.push(e);
        }
      }
    }
*/
    this.data = this.procesaLista[proveedor](src)
    this.newData = this.data;
    this.collectionSize = this.newData.length;

/*
    let fd: string[] = [];
    this.fields = [];
    this.typeValues = [];
    for (const key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        const hoja = src[key];
        for (let i = 0; i < hoja.length; i++) {
          const flds: any[] = hoja[i];
          const arrReg = [];
          for (const fldName in flds) {
            if (Object.prototype.hasOwnProperty.call(flds, fldName)) {
              //              console.log(fldName);
              if (this.fields.indexOf(fldName) < 0) {
                this.fields.push(fldName);
                this.typeValues.push(null);
              }
              arrReg[this.fields.indexOf(fldName)] = flds[fldName];
            }
          }
          this.data.push(arrReg)
          //          console.log(flds);
        }
      }
    }
  */
  }
  async initData() {
    try {
      const arrayp: any = await this.personas.fulllist();
      for (let i = 0; i < arrayp.length; i++) {
        arrayp[i]['fullName'] = (`${arrayp[i]['apellido']} ${arrayp[i]['nombre']}`).trim();
      }
      this.dbPersonas = arrayp;
      console.log("Personas", this.dbPersonas);
/*
      const array = await this.list.getData(`${this.ApiUri}/productos/toprovlista`, {});
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        const e = array[i];
        if (e.pCompra === true) {
          const producto: any = {}

          producto.ori = e;
          producto._id = e._id;
          producto.fullName = '';
          producto.image = e.image;
          if (e.subprod) {
            producto.precioref = round(e.compra / e.contiene, 2);
            producto.contiene = e.subprod.contiene;
            producto.unidad = `${e.subprod.name} ${e.subprod.contiene} ${e.subprod.unidad}`;
            producto.bulto = e.contiene;
          } else {
            producto.precioref = round(e.compra / e.contiene, 2);
            producto.bulto = 1;
            producto.unidad = e.unidad;
            producto.contiene = e.contiene;
          }

          if (e.articulo) {
            producto.articulo_id = e.articulo._id;
            producto.fabricante = e.articulo.fabricante || '';
            producto.marca = e.articulo.marca || '';
            producto.rubro = e.articulo.rubro || '';
            producto.linea = e.articulo.linea || '';
            producto.especie = e.articulo.especie || '';
            producto.edad = e.articulo.edad || '';
            producto.raza = e.articulo.raza || '';
            producto.image = e.image || e.articulo.image;

            producto.rubro = this.isS(producto.rubro, 's');
            producto.linea = this.isS(producto.linea, 's');
            producto.especie = this.isS(producto.especie, 's');
            producto.edad = this.isS(producto.edad, 's');
            producto.raza = this.isS(producto.raza, 's');

            //            producto.image = e.image || e.articulo.image || '';
            producto.art_name = e.articulo.name || '';
            producto.tags = `${e.articulo.tags} ${e.tags}` || '';
            if (e.articulo.d_fabricante === true) producto.fullName = e.articulo.fabricante;
            if (e.articulo.d_marca === true) producto.fullName = (`${producto.fullName} ${e.articulo.marca}`).trim();
            producto.fullName = (`${producto.fullName} ${producto.art_name}`).trim();
            if (e.articulo.d_especie === true) producto.fullName = (`${producto.fullName} ${e.articulo.especie}`).trim();
            if (e.articulo.d_edad === true) producto.fullName = (`${producto.fullName} ${e.articulo.edad}`).trim();
            if (e.articulo.d_raza === true) producto.fullName = (`${producto.fullName} ${e.articulo.raza}`).trim();
            producto.fullName = (`${producto.fullName} ${e.name}`).trim();
            if (e.subprod) {
              producto.fullName = (`${producto.fullName} ${producto.bulto}`).trim();
              producto.fullName = (`${producto.fullName} ${producto.unidad}`).trim();
            } else {
              producto.fullName = (`${producto.fullName} ${producto.contiene}`).trim();
              producto.fullName = (`${producto.fullName} ${producto.unidad}`).trim();
            }
            if (e.articulo.d_rubro) producto.fullName = (`${producto.fullName} ${e.articulo.rubro}`).trim();
            if (e.articulo.d_linea) producto.fullName = (`${producto.fullName} ${e.articulo.linea}`).trim();

            if (producto.fabricante && this.listas.fabricante.indexOf(producto.fabricante) < 0) this.listas.fabricante.push(producto.fabricante);
            if (producto.marca && this.listas.marca.indexOf(producto.marca) < 0) this.listas.marca.push(producto.marca);
            if (producto.especie && this.listas.especie.indexOf(producto.especie) < 0) this.listas.especie.push(producto.especie);
            if (producto.edad && this.listas.edad.indexOf(producto.edad) < 0) this.listas.edad.push(producto.edad);
            if (producto.raza && this.listas.raza.indexOf(producto.raza) < 0) this.listas.raza.push(producto.raza);
            if (producto.rubro && this.listas.rubro.indexOf(producto.rubro) < 0) this.listas.rubro.push(producto.rubro);
            if (producto.linea && this.listas.linea.indexOf(producto.linea) < 0) this.listas.linea.push(producto.linea);
          }
          producto.precioToShow = e.compra;
          producto.codigo = e.codigo || '';
          producto.compra = e.compra;
          producto.name = e.name;
          producto.reposicion = e.reposicion;
          this.dbList.push(producto);
        }

      }
      */
    } catch (error) {
      console.log(error);
    }
//    console.log(this.dbList);
//    console.log(this.listas);

  }
  isS(str, char): any {
    const isS = str.substr(str.length - 1);
    if (isS.toLocaleUpperCase() === char.toLocaleUpperCase()) str = str.substr(0, str.length - 1);
    return str
  }
  async setHeight() {
/*
    const element = document.getElementsByTagName('html');
    const h = document.getElementsByTagName('html')[0].clientHeight - 220 - 61;
    const b = h - 10;
    document.getElementById('main').style.height = `${h}px`;
  */
   }

  onResize(event) {
    this.setHeight();
  }

  async gotData(event): Promise<void> {
    this.data = await this.csv.formatData(event.data);
    this.fields = this.csv.fields;
    this.typeValues = this.csv.fieldsValues;
    //    console.log(this.data);
  }

  setReg(idx): any {
    const reg = {}
    for (let i = 0; i < this.typeValues.length; i++) {
      const name = this.typeValues[i];
      if (name) {
        reg[name] = this.data[idx][i];
      }
    }
    return reg;
  }

  selectedlista(idx?: number) {
    this.selectedIdx = idx;
    let resultado = [];



    /*
        console.log(this.data[idx]);
        const reg = {}
        for (let i = 0; i < this.typeValues.length; i++) {
          const name = this.typeValues[i];
          if(name){
            reg[name] = this.data[idx][i];
          }
        }
    */
    this.selectedReg = this.setReg(idx);
    console.log(this.selectedReg)
    let qry = {};
    let extraData = {};
    let descripcion = '';

    if (this.selectedReg.fabricante) qry['fabricante'] = this.selectedReg.fabricante.toLowerCase();
    if (this.selectedReg.marca) qry['marca'] = this.selectedReg.marca.toLowerCase();
    if (this.selectedReg.especie) qry['especie'] = this.selectedReg.especie.toLowerCase();
    if (this.selectedReg.edad) qry['edad'] = this.selectedReg.edad.toLowerCase();
    if (this.selectedReg.raza) qry['raza'] = this.selectedReg.raza.toLowerCase();
    if (this.selectedReg.rubro) qry['rubro'] = this.selectedReg.rubro.toLowerCase();
    if (this.selectedReg.linea) qry['linea'] = this.selectedReg.linea.toLowerCase();
    resultado = this.findAnd(this.dbList, qry);
    /*
        if (this.selectedReg.descripcion){
          let descripcion = JSON.parse(JSON.stringify(this.selectedReg.descripcion.trim()));
          descripcion = descripcion.replace(/[+()]/g, " ");
          descripcion = descripcion.replace(/ +/g,' ');
          descripcion = descripcion.trim().split(' ');
          const findData = [];
          for (let i = 0; i < descripcion.length; i++) {
            findData.push({fullName: descripcion[i]});
          }
        }
    */
    if (this.selectedReg.contiene) qry['contiene'] = this.selectedReg.contiene;
    if (this.selectedReg.bulto) qry['bulto'] = this.selectedReg.bulto;
    resultado = this.findAnd(resultado, qry);
    console.log("cantidad", resultado)

    descripcion = JSON.parse(JSON.stringify(this.selectedReg.descripcion.trim()));
    descripcion = descripcion.replace(/[+()]/g, " ");
    descripcion = descripcion.replace(/ +/g, ' ');

    const descArray = descripcion.toLowerCase().split(' ');
    //    console.log(descArray);

    qry = {}
    let strDescr = ""
    let prevData = [].concat(resultado);
    for (let i = 0; i < descArray.length; i++) {
      const e = descArray[i];
      strDescr = `${strDescr} ${e}`;
      qry['fullName'] = e;
      const retData = this.findAnd(prevData, qry);
      if (retData.length === 0) {
        resultado = [].concat(prevData);
        console.log('termina', strDescr, prevData);
        //        break;
      } else {
        prevData = [].concat(retData);
        console.log('continua', strDescr, prevData);
      }
    }



    if (this.selectedReg.precio) extraData['precio'] = this.selectedReg.precio;
    if (this.selectedReg.codigoProveedor) extraData['codigoProveedor'] = this.selectedReg.codigoProveedor;
    /*
        if (this.selectedReg.descripcion){
          descripcion = JSON.parse(JSON.stringify(this.selectedReg.descripcion.trim()));
          descripcion = descripcion.replace(/[+()]/g, " ");
          descripcion = descripcion.replace(/ +/g,' ');
          console.log(descripcion);
          for (const key in this.listas) {
            if (Object.prototype.hasOwnProperty.call(this.listas, key)) {
              if (!this.selectedReg[key]) {
                const array = this.listas[key];
                for (let i = 0; i < array.length; i++) {
                  if(array[i].length > 2){
                    const sstr = new RegExp(array[i], 'i');
                    if (descripcion.search(sstr) > -1) {
                      qry[key] = array[i];
                    }
                  }
                }
              }
            }
          }
          descripcion = descripcion.replace(/ +/g,' ');
          descripcion = descripcion.replace(/\b . \b/g,' ');
          descripcion = descripcion.replace(/\b .. \b/g,' ');
          extraData['notFound'] = descripcion.trim().split(' ');
        }
    */
    extraData['descripcion'] = descripcion;
    extraData['reg'] = this.selectedReg;
    console.log(qry)
    let condicion = [];
    /*

        for (const key in qry) {
          if (Object.prototype.hasOwnProperty.call(qry, key)) {
            if (condicion.length)
              condicion.push(`&& articulo['${key}'] === qry['${key}']`)
            else
              condicion.push(`articulo['${key}'] === qry['${key}']`)
          }
        }
        const strEval = '( '+ condicion.toString().replace(/[,]/g,' ')+ ' )';
        const test = []
    */
    //    resultado = this.findAnd(resultado, qry);
    /*
        this.dbList.forEach(articulo => {
          let result: boolean = true;
          for (const key in qry) {
            if (Object.prototype.hasOwnProperty.call(qry, key)) {
              const str = new RegExp(qry[key],'i');
              if(typeof(articulo[key]) === 'string'){
                result = articulo[key].search(str) > -1 && result ? true : false;
              } else {
                result = articulo[key] === qry[key] && result ? true : false;
              }
            }
            if(!result){
              break;
            }
          }
          if(result){
            resultado.push(articulo);
          }
        });
    */
    /*
        if(extraData['notFound']){
          for (let i = 0; i < extraData['notFound'].length; i++) {
            const e = extraData['notFound'][i];
            resultado = this.strFoundIn(resultado,'fullName', this.isS(e,'s'))
          }
        }
    */
    this.articuloList = [].concat(resultado);
    //    console.log(extraData);
    console.log(resultado);
  }

  findAnd(dbList, qry): any[] {
    const resultado = [];
    dbList.forEach(articulo => {
      let result: boolean = true;
      for (const key in qry) {
        if (Object.prototype.hasOwnProperty.call(qry, key)) {
          const str = new RegExp(qry[key], 'i');
          if (typeof (articulo[key]) === 'string') {
            result = articulo[key].search(str) > -1 && result ? true : false;
          } else {
            result = articulo[key] === qry[key] && result ? true : false;
          }
        }
        if (!result) {
          break;
        }
      }
      if (result) {
        resultado.push(articulo);
      }
    });
    return resultado;
  }

  strFoundIn(array: any, key: string, str: string): object[] {
    let retObj = []
    console.log('strFoundIn', str, key, array)
    const tmpArray = [].concat(array);
    for (let i = 0; i < array.length; i++) {
      const e: any = array[i];
      const strRegex = new RegExp(str, "i")
      console.log(e[key], str)
      if (e[key].search(strRegex) > -1) {
        retObj.push(array[i]);
      }
    }
    if (retObj.length === 0) return array;
    return retObj
  }

  memQry(inArray: any, inQry: any): any[] {
    const _retData: any = [];
    const _strEval = '( ' + inQry.toString().replace(/[,]/g, ' ') + ' )';
    inArray.forEach(element => {
      if (eval(_strEval)) _retData.push(element)
    });
    return
  }
  findSimilares() {

  }

//  async bucarProductos() {
//    const qry: any = this.makeQry();
//    const Articulo: any = (qry ? qry.Articulo : {});
//    const Producto: any = (qry ? qry.Producto : {});
//    const Extra: any = (qry ? qry.Extra : {});
//    let searchItem: any = (qry ? qry.searchItem : "");
//    const Sort = this.articuloOrder[this.listaOrden].sort;
//
//    //    if(reg.descripcion){
//    //      this.searchItem = reg.descripcion;
//    ////      searchItem = reg.descripcion;
//    //    }
//
//    if (this.selectedReg.fabricante) Articulo['fabricante'] = { $regex: { params: this.selectedReg.fabricante, flags: 'i' } };
//    if (this.selectedReg.marca) Articulo['marca'] = { $regex: { params: this.selectedReg.marca, flags: 'i' } };
//    if (this.selectedReg.rubro) Articulo['rubro'] = { $regex: { params: this.selectedReg.rubro, flags: 'i' } };
//    if (this.selectedReg.linea) Articulo['linea'] = { $regex: { params: this.selectedReg.linea, flags: 'i' } };
//    if (this.selectedReg.especie) Articulo['especie'] = { $regex: { params: this.selectedReg.especie, flags: 'i' } };
//    if (this.selectedReg.edad) Articulo['edad'] = { $regex: { params: this.selectedReg.edad, flags: 'i' } };
//    if (this.selectedReg.raza) Articulo['raza'] = { $regex: { params: this.selectedReg.raza, flags: 'i' } };
//    //    Producto['pCompra'] = { $eq: true }
//    if (this.selectedReg.bultocontiene && this.selectedReg.contiene) {
//      if (this.selectedReg.bultocontiene == 1) {
//        if (this.selectedReg.contiene) Extra['contiene'] = { $eq: this.selectedReg.contiene };
//      } else {
//        Extra['contiene'] = { $eq: this.selectedReg.bultocontiene };
//        if (this.selectedReg.contiene) Extra['scontiene'] = { $eq: this.selectedReg.bultocontiene };
//      }
//    }
//    try {
//      const data: any = await this.list.readData(
//        `${this.ApiUri}/productos/list`,
//        { Articulo, Producto, Extra, searchItem, Sort }
//      );
//      this.articuloList = data;
//      console.log(this.articuloList);
//    } catch (error) {
//      console.log(error);
//    }
//    this.wait = false;
//
//    //this.list.readData(
//    //  `${this.ApiUri}/productos/list`,
//    //  {Articulo, Producto, Extra, searchItem, Sort }
//    //).subscribe(
//    //  res => {
//    //    const data = res as any;
//    //    this.articuloList = data;
//    //    this.wait = false;
//    //    console.log(this.articuloList);
//    //  },
//    //  err => {
//    //    console.log(err);
//    //    this.wait = false;
//    //  }
//    //);
//
//  }
//
//  /*********************************/
//  makeQry(): any {
//    const qry: any = {
//      Articulo: {}
//      , Producto: {}
//      , Extra: {}
//      , searchItem: this.searchItem
//    }
//
//    const array = this.filterButtons;
//    for (let i = 0; i < array.length; i++) {
//      const el = array[i];
//      switch (el.tipo) {
//        case 'radioButton':
//          for (let n = 0; n < el.buttons.length; n++) {
//            const sb = el.buttons[n];
//            if (sb.value > 0) {
//              qry[sb.qryName][sb.qryKey] = sb.qryValue[sb.value - 1];
//            }
//          }
//          break;
//        default:
//          if (el.value > 0) {
//            qry[el.qryName][el.qryKey] = el.qryValue[el.value - 1];
//          }
//          break;
//      }
//    }
//    console.log("qry", qry);
//    return qry;
//  }
//  buttonMsg(array) {
//    console.log("Procesa Buttons Msg", array)
//    this.filterButtons = array;
//    this.searchProductos();
//  }

//  Prod_filterEvent(ev): void {
//    for (const propName in ev) {
//      this[propName] = ev[propName];
//      console.log(propName, ev[propName])
//    }
//    this.bucarProductos();
//  }

//  listProductos(): void {
//    this.searchProductos();
//  }

  newReg(ev) {
    console.log(ev)
  }

  selected(art) {
    console.log(art);
  }

//  async searchProductos() {
//    if (this.wait) { return; }
//    this.wait = true;
//    const qry: any = this.makeQry();
//    const Articulo: any = (qry ? qry.Articulo : {});
//    const Producto: any = (qry ? qry.Producto : {});
//    const Extra: any = (qry ? qry.Extra : {});
//    const searchItem: any = (qry ? qry.searchItem : "");
//    const Sort = this.articuloOrder[this.listaOrden].sort;
//    console.log(Articulo);
//    try {
//      const data: any = await this.list.readData(
//        `${this.ApiUri}/productos/list`,
//        { Articulo, Producto, Extra, searchItem, Sort }
//      );
//      this.articuloList = data;
//      console.log(this.articuloList);
//    } catch (error) {
//      console.log(error);
//    }
//    this.wait = false;
//    /*
//    this.list.readData(
//      `${this.ApiUri}/productos/list`,
//      {Articulo, Producto, Extra, searchItem, Sort }
//    ).subscribe(
//      res => {
//        const data = res as any;
//        if ( data.length === 1 && Articulo['$and'] && Articulo['$and'].length === 1
//        && ( this.searchItem === data[0].codigo || this.searchItem === data[0].plu ))
//        {
//          this.searchItem = '';
//          this.wait = false;
//          this.searchProductos();
//        } else {
//          this.articuloList = data;
//        }
//        this.wait = false;
//        console.log(this.articuloList);
//      },
//      err => {
//        console.log(err);
//        this.wait = false;
//      }
//    );
//    */
//  }

  async checkIdLista() {

/*
    if (this.proveedor === '') {
      alert('Debe Seleccionar Proveedor');
      return;
    }
*/
/*
    for (let i = 0; i < this.data.length; i++) {
//      const e = this.setReg(i);
      const e = this.data[i];
      if(!e['codigo_proveedor'] || e['codigo_proveedor']=== null) e['codigo_proveedor'] = '';
      e['codigo_proveedor'] = e['codigo_proveedor'] + '';
      if (e['codigo_proveedor'] === '') {
        const descripcion = e['descripcion'].replace(/ /g, '');
        e['codigo_proveedor'] = descripcion.toLowerCase();
        e['codigo_proveedor'] += e['bulto'] + '';
        e['codigo_proveedor'] += e['contiene'] + '';
      }
      const reg = await this.list.getId({ codigo_proveedor: e['codigo_proveedor'], id_proveedor: this.proveedor });
      //      this.data[i].splice(0, 0, reg['_id']);
      //      this.data[i].splice(1, 0, reg['status']);
      e._id = reg['_id'];
      e['status'] = reg['status']
//      this.data[i].push(reg[0]['_id']);
//      this.data[i].push(reg[0]['status']);
      //        this.data[i].push(reg['status']);
    }
//    this.fields.push('_id')
//    this.fields.push('status');

//    this.typeValues.push('_id');
//    this.typeValues.push('status');
    console.log(this.data);
  */
  }

  async checkId(e){
    e['codigo_proveedor'] = e['codigo_proveedor'] + '';
    if (e['codigo_proveedor'] === '') {
      const descripcion = e['descripcion'].replace(/ +/g, '');
      e['codigo_proveedor'] = descripcion;
      e['codigo_proveedor'] += e['bulto'] + '';
      e['codigo_proveedor'] += e['contiene'] + '';
    }
    const reg = await this.list.getId({ codigo_proveedor: e['codigo_proveedor'], id_proveedor: this.proveedor });
    //      this.data[i].splice(0, 0, reg['_id']);
    //      this.data[i].splice(1, 0, reg['status']);
    e._id = reg['_id'];
    e['status'] = reg['status']
  }
  async import(e){
    //      e['fecha'] = '2021-05-20';
    e['id_proveedor'] = this.proveedor;
    //      e['coef_descuento'] = isNaN(e['coef_descuento']) ? 1 : e['coef_descuento'];
    e['bulto'] = (!e['bulto'] || e['bulto'] === undefined || e['bulto'] < 0 ? 1 : e['bulto']);
    e['contiene'] = (!e['contiene'] || e['contiene'] === undefined || e['contiene'] < 0 ? 1 : e['contiene']);
    if (e['codigo_proveedor'] === undefined || e['codigo_proveedor'] === '') {
      const descripcion = e['descripcion'].replace(/ +/g, '');
      e['codigo_proveedor'] = descripcion;
      e['codigo_proveedor'] += e['bulto'] + '';
      e['codigo_proveedor'] += e['contiene'] + '';
    }
    e['codigo_proveedor'] = e['codigo_proveedor'] + '';

    const articulo = {
      _id: e['_id']
      , id_proveedor: e['id_proveedor']
      , codigo_proveedor: e['codigo_proveedor']
      , codigo_ean: (e['codigo_ean'] ? e['codigo_ean']+'' : '')
//        , registro: e
      , fabricante: e['fabricante']
      , marca: e['marca']
      , especie: e['especie']
      , edad: e['edad']
      , raza: e['raza']
      , rubro: e['rubro']
      , linea: e['linea']
      , descripcion: e['descripcion']
      , name: e['name']
      , bulto: e['bulto']
      , bname: e['bname']
      , contiene: e['contiene']
      , cname: e['cname']
      , unidad: e['unidad']
      //        ,status: e['status']
      , id_articulo: e['id_articulo']
      , id_producto: e['id_producto']
    }
    const precio = {
      fecha: '20210521'
      , id_lista: articulo._id
      , id_proveedor: e['id_proveedor']
      , codigo_proveedor: e['codigo_proveedor']
      , codigo_ean: e['codigo_ean']
      , id_articulo: e['id_articulo']
      , id_producto: e['id_producto']
      , precio_lista: e['precio_lista']
      , coef_descuento: e['coef_descuento']
      , coef_retenciones: e['coef_retenciones']
      , precio_final: e['precio_final']
    }
    try {
      const save = await this.list.import(articulo);
//        console.log(save);
    } catch (error) {
      console.log(error);
      console.log(articulo);
    }
  }
  async importarFile() {
    console.log('Proveedor', this.proveedor);
/*
    if (this.proveedor === '') {
      alert('Debe Seleccionar Proveedor');
      return;
    }
*/
    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i];
      this.checkId(e);
      this.import(e);
    }

/*

    const toSave = [];
    for (let i = 0; i < this.data.length; i++) {
      //const e = this.setReg(i);
      const e = this.data[i];
      //      e['fecha'] = '2021-05-20';
      e['id_proveedor'] = this.proveedor;
      //      e['coef_descuento'] = isNaN(e['coef_descuento']) ? 1 : e['coef_descuento'];
      e['bulto'] = (!e['bulto'] || e['bulto'] === undefined || e['bulto'] < 0 ? 1 : e['bulto']);
      e['contiene'] = (!e['contiene'] || e['contiene'] === undefined || e['contiene'] < 0 ? 1 : e['contiene']);
      if (e['codigo_proveedor'] === undefined || e['codigo_proveedor'] === '') {
        const descripcion = e['descripcion'].replace(/ +/g, '');
        e['codigo_proveedor'] = descripcion;
        e['codigo_proveedor'] += e['bulto'] + '';
        e['codigo_proveedor'] += e['contiene'] + '';
      }
      e['codigo_proveedor'] = e['codigo_proveedor'] + '';

      const articulo = {
        _id: e['_id']
        , id_proveedor: e['id_proveedor']
        , codigo_proveedor: e['codigo_proveedor']
        , codigo_ean: (e['codigo_ean'] ? e['codigo_ean']+'' : '')
//        , registro: e
        , fabricante: e['fabricante']
        , marca: e['marca']
        , especie: e['especie']
        , edad: e['edad']
        , raza: e['raza']
        , rubro: e['rubro']
        , linea: e['linea']
        , descripcion: e['descripcion']
        , name: e['name']
        , bulto: e['bulto']
        , bname: e['bname']
        , contiene: e['contiene']
        , cname: e['cname']
        , unidad: e['unidad']
        //        ,status: e['status']
        , id_articulo: e['id_articulo']
        , id_producto: e['id_producto']
      }
      const precio = {
        fecha: '20210521'
        , id_lista: articulo._id
        , id_proveedor: e['id_proveedor']
        , codigo_proveedor: e['codigo_proveedor']
        , codigo_ean: e['codigo_ean']
        , id_articulo: e['id_articulo']
        , id_producto: e['id_producto']
        , precio_lista: e['precio_lista']
        , coef_descuento: e['coef_descuento']
        , coef_retenciones: e['coef_retenciones']
        , precio_final: e['precio_final']
      }
      try {
        const save = await this.list.import(articulo);
//        console.log(save);
      } catch (error) {
        console.log(error);
        console.log(i, this.data[i])
        console.log(articulo);
      }
    }
*/
  }
  margen(sug,rep): number {
    return round((((sug || rep) / rep)-1)*100,2)
  }
}
