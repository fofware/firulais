import { HttpClient } from '@angular/common/http';
import { ClassMethod } from '@angular/compiler';
import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cargalistas.component.css']
})

export class CargalistasComponent implements OnInit, OnChanges {
  provSettings = proveedoresSettings;
  ApiUri = API_URI;
  wait = false;
  searchItem = '';
  options: {
    fabricante: [],
    marca: [],
    name: [],
    edad: [],
    especie: [],
    raza: [],
    rubro: [],
    linea: []
  }
  selectedIdx: number = null;
  selectedReg: any = {};
  articuloList: any[] = [];

  dbList: any[] = [];
  listaOrden = 0;
  showArticulos = true;
  showStock = true;

  encode = 'iso8859-3'
  data = []
  fields = []

  typeValues = [];
  modalsNumber = 0;
  dbPersonas: IPersonas[];
  proveedor = 0;
  newData:any = [];
  errorData:any = [];

  page = 1;
  pageSize = 15;
  collectionSize = 0;
  disabled = false;
  loadedfile = {};

  constructor(
    private csv: CsvfileService,
    private http: HttpClient,
    private list: ListasArtProdService,
    private personas: PersonasService,
    private modalService: NgbModal,
    private procesaLista: ListasProveedoresService,
  ) {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  ngOnInit(): void {
//    this.setHeight();
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
          this.data = await this.procesaLista[prove.type](prove,result.wbData)
          console.log(result);
          this.loadedfile['size'] = result.file.size;
          this.loadedfile['filename'] = result.file.name;
          this.loadedfile['lastModified'] = result.file.lastModified;
          this.loadedfile['proveedor_id'] = this.provSettings[this.proveedor]._id;
          await this.transformData();
          //this.newData = this.data;
          console.log("New Data",this.newData);
          this.collectionSize = this.newData.length;
        }
      });
    }
  }

  async transformData(){
    console.log("Source Data",this.data);
    this.newData = [];
    const tempData = [];

    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i];
      const art = {};
      art['codigo'] = e.codigo;
      art['proveedor'] = e.proveedor;
      art['hoja'] = e.hoja;
      art['nombre'] = e.nombre;
      art['fabricante'] = e.fabricante;
      art['marca'] = e.marca;
      art['name'] = e.name;
      art['especie'] = e.especie;
      art['edad'] = e.edad;
      art['raza'] = e.raza;
      art['rubro'] = e.rubro;
      art['linea'] = e.linea;
      art['unidades'] = e.unidades;
      art['peso'] = e.peso;
      art['pesable'] = e.pesable;
      art['ean'] = e.ean ? e.ean : null;

      const productos = [];

      if(e.unidades > 1){
        const prod = {};
        prod['codigo'] = e.codigo;
        prod['ean'] = e.ean ? e.ean : null;
        prod['name'] = e.nbulto;
        prod['contiene'] = e.unidades;
        prod['unidad'] = e.presentacion+" "+ e.peso + ' ' + e.unidad;
        prod['margen'] = e.vbulto.margen;
        prod['tarjeta'] = e.vbulto.tarjeta;
        prod['debito'] = e.vbulto.debito;
        prod['efectivo'] = e.vbulto.efectivo;
        prod['descuento1'] = e.vbulto.descuento1;
        prod['descuento2'] = e.vbulto.descuento2;
        prod['base'] = e.vinput.base;
        prod['lista'] = e.vinput.lista;
        prod['oferta'] = e.vinput.oferta;
        prod['promo'] = e.vinput.promo;
        prod['reposicion'] = e.vinput.reposicion;
        prod['sugerido'] = e.vinput.sugerido*e.unidades;
        prod['unidades'] = e.unidades;
        prod['pesable'] = 0
        prod['coeficiente'] = 1;
        prod['unidades'] = e.unidades
        productos.push(prod);
        const prod1 = {};
        prod1['codigo'] = e.codigo;
        prod1['ean'] = e.ean ? e.ean : null;
        prod1['name'] = e.presentacion;
        prod1['contiene'] = e.peso;
        prod1['unidad'] = e.unidad;
        prod1['margen'] = e.vunidad.margen;
        prod1['tarjeta'] = e.vunidad.tarjeta;
        prod1['debito'] = e.vunidad.debito;
        prod1['efectivo'] = e.vunidad.efectivo;
        prod1['descuento1'] = e.vunidad.descuento1;
        prod1['descuento2'] = e.vunidad.descuento2;
        prod1['base'] = Math.ceil(e.vinput.base/e.unidades);
        prod1['lista'] = Math.ceil(e.vinput.lista/e.unidades);
        prod1['oferta'] = e.vinput.oferta;
        prod1['reposicion'] = Math.ceil(e.vinput.reposicion/e.unidades);
        prod1['sugerido'] = e.vinput.sugerido;
        prod1['pesable'] = 0
        prod1['coeficiente'] = 1;
        prod1['unidades'] = 1
        productos.push(prod1);
      } else {
        const prod = {};
        prod['codigo'] = e.codigo;
        prod['ean'] = e.ean ? e.ean : null;
        prod['name'] = e.presentacion;
        prod['contiene'] = e.peso;
        prod['unidad'] = e.unidad;
        prod['margen'] = e.vbulto.margen;
        prod['tarjeta'] = e.vbulto.tarjeta;
        prod['debito'] = e.vbulto.debito;
        prod['efectivo'] = e.vbulto.efectivo;
        prod['descuento1'] = e.vbulto.descuento1;
        prod['descuento2'] = e.vbulto.descuento2;
        prod['base'] = Math.ceil(e.vinput.base/e.unidades);
        prod['lista'] = Math.ceil(e.vinput.lista/e.unidades);
        prod['oferta'] = e.vinput.oferta;
        prod['reposicion'] = Math.ceil(e.vinput.reposicion/e.unidades);
        prod['sugerido'] = e.vinput.sugerido;
        prod['pesable'] = 0
        prod['coeficiente'] = 1;
        prod['unidades'] = 1
        productos.push(prod);
      }
      if(e.pesable === 1){
        const prod = {};
        prod['codigo'] = e.codigo;
        prod['ean'] = e.ean ? e.ean : null;
        prod['name'] = "x";
        prod['contiene'] = 1;
        prod['unidad'] = e.unidad;
        prod['margen'] = e.vunidad.margen;
        prod['tarjeta'] = e.vunidad.tarjeta;
        prod['debito'] = e.vunidad.debito;
        prod['efectivo'] = e.vunidad.efectivo;
        prod['descuento1'] = e.vunidad.descuento1;
        prod['descuento2'] = e.vunidad.descuento2;
        prod['base'] = Math.ceil(e.vinput.base/e.unidades/e.peso);
        prod['lista'] = Math.ceil(e.vinput.lista/e.unidades/e.peso);
        prod['reposicion'] = Math.ceil(e.vinput.reposicion/e.unidades/e.peso);
        prod['pesable'] = 1
        prod['coeficiente'] = 1/e.peso;
        prod['unidades'] = 1
        productos.push(prod);
      }
      art['productos'] = productos;
      tempData.push(art);
    }
    this.newData = tempData;
  }

  async importArticulos(){
    let promesas = [];
    try {
      //const lista:any = await this.procesaLista.checkLista(this.loadedfile);
      //console.log(lista);
      let productoNuevo = 0;
      let precioNuevo = 0;
      for (const reg of this.newData) {
        const producto:any = await this.procesaLista.addProducto(reg);
        if( producto.lastErrorObject.updatedExisting === false ) productoNuevo++;

        //console.log(producto);
        /*
        const setPrecio = {
          proveedor_lista_id: lista.value._id,
          proveedor_id: reg.proveedor,
          proveedor_articulo: producto.value._id,
          producto_id: reg.producto,
          vinput: reg.vinput,
          vbulto: reg.vbulto,
          vunidad: reg.vunidad,
        }
        const precioStatus = await this.procesaLista.setprecio(setPrecio);
        //console.log( precioStatus );
        */
      }
      console.log(`Productos en Lista: ${this.newData.length} - Nuevos: ${productoNuevo}`)
    } catch (error) {
      console.log(error);
    }
  }

  async initData() {
    try {
      const arrayp: any = await this.personas.fulllist();
      for (let i = 0; i < arrayp.length; i++) {
        arrayp[i]['fullName'] = (`${arrayp[i]['apellido']} ${arrayp[i]['nombre']}`).trim();
      }
      this.dbPersonas = arrayp;
      console.log("Personas", this.dbPersonas);
    } catch (error) {
      console.log(error);
    }
  }
}
