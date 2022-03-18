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
import { ProgressUpdateComponent } from '../progress-update/progress-update.component';
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
  readData:any = [];
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

  async readLista(){
    console.log("selccionado",this.proveedor)
    console.log(this.provSettings[this.proveedor])
    const prove = this.provSettings[this.proveedor];
    if(prove.type === "XLSX"){
//      console.log("Read File");
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
      modalRef.componentInstance.proveedor = prove;
      modalRef.componentInstance.encode = prove.encode;
      modalRef.result.then(async (result) => {
        if (result) {
          console.log(result);
          switch (result.action) {
            case 'upload':
              if(!result.dbData._id
              || result.changed.saveData
              || result.changed.file
              || result.changed.date )
              {
                const dbData:any = await this.procesaLista.setLista(result.dbData);
                //if(dbData.ok)
                  result.dbData = dbData.value;
              }
              prove['lista_id'] = result.dbData._id;
              console.log(result.dbData);
              console.log(prove);
              if(result.changed.saveData){
                this.data = await this.procesaLista[prove.type](prove,result.wbData);
                console.log(this.data);


                //this.loadedfile['size'] = result.file.size;
                //this.loadedfile['filename'] = result.file.name;
                //this.loadedfile['lastModified'] = result.file.lastModified;
                //this.loadedfile['proveedor_id'] = this.provSettings[this.proveedor]._id;
                await this.transformData();
                console.log("New Data",this.newData);
                this.collectionSize = this.newData.length;
                await this.importProductos();
              }
              break;
            case 'vigencia':
                console.log("Regraba Lista Id");
              break;
            default:
              console.log("Canceló");
              break;
          }


        }
      }, result => {
        console.log("dismissed",result);
        switch (result) {
          case 'cancel':
            break;
          default:
            break;
        }
      });
    }
  }

  async transformData(){
    console.log("Source Data",this.data);
    this.newData = [];
    this.readData = [];
    const tempData = [];

    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i];
      const art = {};
      art['codigo'] = e.codigo.trim();
      art['proveedor'] = e.proveedor;
      art['hoja'] = e.hoja.trim();
      art['nombre'] = e.nombre.trim();
      art['lista_id'] = e.lista_id;

      if (e.ean) art['ean'] = e.ean.trim();
      if (e.ean_bulto) art['ean_bulto'] = e.ean_bulto.trim();
      if (e.unidades) art['unidades'] = e.unidades;
      if (e.peso) art['peso'] = e.peso;
      if (e.fabricante) art['fabricante'] = e.fabricante.trim();
      if (e.marca) art['marca'] = e.marca.trim();
      if (e.name) art['name'] = e.name.trim();
      if (e.especie) art['especie'] = e.especie.trim();
      if (e.edad) art['edad'] = e.edad.trim();
      if (e.raza) art['raza'] = e.raza.trim();
      if (e.rubro) art['rubro'] = e.rubro.trim();
      if (e.linea) art['linea'] = e.linea.trim();

      //art['fabricante'] = e.fabricante;
      //art['marca'] = e.marca;
      //art['name'] = e.name;
      //art['especie'] = e.especie;
      //art['edad'] = e.edad;
      //art['raza'] = e.raza;
      //art['rubro'] = e.rubro;
      //art['linea'] = e.linea;
      if (e.lista) art['lista'] = round(e.lista,2);
      if (e.preciob) art['preciob'] = round(e.preciob,2);
      if (e.preciot) art['preciot'] = round(e.preciot,2);
      if (e.unidades_desc) art['unidades_desc'] = e.unidades_desc.trim();
      if (e.peso_desc) art['peso_desc'] = e.peso_desc.trim();
      if (e.presentacion) art['presentacion'] = e.presentacion.trim();
      if (e.coef) art['coef'] = round(e.coef,2);
      if (e.precio) art['precio'] = round(e.precio,2);
      if (e.bulto) art['bulto'] = round(e.bulto,2);
      if (e.sugerido) art['sugerido'] = round(e.sugerido,2);
      if (e.margen_s) art['margen_s'] = round(e.margen_s,2);
      //art['pesable'] = e.pesable;
      //art['ean'] = e.ean ? e.ean : null;
      //art['precio'] = e.precio;

      const productos = [];

      //if(e.unidades > 1){
      //  const prod = {};
      //  prod['codigo'] = e.codigo;
      //  prod['ean'] = e.ean ? e.ean : null;
      //  prod['name'] = e.nbulto;
      //  prod['contiene'] = e.unidades;
      //  prod['unidad'] = e.presentacion+" "+ e.peso + ' ' + e.unidad;
      //  prod['margen'] = e.vbulto.margen;
      //  prod['tarjeta'] = e.vbulto.tarjeta;
      //  prod['debito'] = e.vbulto.debito;
      //  prod['efectivo'] = e.vbulto.efectivo;
      //  prod['descuento1'] = e.vbulto.descuento1;
      //  prod['descuento2'] = e.vbulto.descuento2;
      //  prod['base'] = e.vinput.base;
      //  prod['lista'] = e.vinput.lista;
      //  prod['oferta'] = e.vinput.oferta;
      //  prod['promo'] = e.vinput.promo;
      //  prod['reposicion'] = e.vinput.reposicion;
      //  prod['sugerido'] = e.vinput.sugerido*e.unidades;
      //  prod['unidades'] = e.unidades;
      //  prod['pesable'] = 0
      //  prod['coeficiente'] = 1;
      //  prod['unidades'] = e.unidades
      //  productos.push(prod);
      //  const prod1 = {};
      //  prod1['codigo'] = e.codigo;
      //  prod1['ean'] = e.ean ? e.ean : null;
      //  prod1['name'] = e.presentacion;
      //  prod1['contiene'] = e.peso;
      //  prod1['unidad'] = e.unidad;
      //  prod1['margen'] = e.vunidad.margen;
      //  prod1['tarjeta'] = e.vunidad.tarjeta;
      //  prod1['debito'] = e.vunidad.debito;
      //  prod1['efectivo'] = e.vunidad.efectivo;
      //  prod1['descuento1'] = e.vunidad.descuento1;
      //  prod1['descuento2'] = e.vunidad.descuento2;
      //  prod1['base'] = Math.ceil(e.vinput.base/e.unidades);
      //  prod1['lista'] = Math.ceil(e.vinput.lista/e.unidades);
      //  prod1['oferta'] = e.vinput.oferta;
      //  prod1['reposicion'] = Math.ceil(e.vinput.reposicion/e.unidades);
      //  prod1['sugerido'] = e.vinput.sugerido;
      //  prod1['pesable'] = 0
      //  prod1['coeficiente'] = 1;
      //  prod1['unidades'] = 1
      //  productos.push(prod1);
      //} else {
      //  const prod = {};
      //  prod['codigo'] = e.codigo;
      //  prod['ean'] = e.ean ? e.ean : null;
      //  prod['name'] = e.presentacion;
      //  prod['contiene'] = e.peso;
      //  prod['unidad'] = e.unidad;
      //  if(e.vbulto){
      //    prod['margen'] = e.vbulto.margen;
      //    prod['tarjeta'] = e.vbulto.tarjeta;
      //    prod['debito'] = e.vbulto.debito;
      //    prod['efectivo'] = e.vbulto.efectivo;
      //    prod['descuento1'] = e.vbulto.descuento1;
      //    prod['descuento2'] = e.vbulto.descuento2;
      //  }
      //  if(e.vinput){
      //    prod['base'] = Math.ceil(e.vinput.base/e.unidades);
      //    prod['lista'] = Math.ceil(e.vinput.lista/e.unidades);
      //    prod['oferta'] = e.vinput.oferta;
      //    prod['reposicion'] = Math.ceil(e.vinput.reposicion/e.unidades);
      //    prod['sugerido'] = e.vinput.sugerido;
      //  }
      //  prod['pesable'] = 0
      //  prod['coeficiente'] = 1;
      //  prod['unidades'] = 1
//
      //  productos.push(prod);
      //}
      //if(e.pesable === 1){
      //  const prod = {};
      //  prod['codigo'] = e.codigo;
      //  prod['ean'] = e.ean ? e.ean : null;
      //  prod['name'] = "x";
      //  prod['contiene'] = 1;
      //  prod['unidad'] = e.unidad;
      //  prod['margen'] = e.vunidad.margen;
      //  prod['tarjeta'] = e.vunidad.tarjeta;
      //  prod['debito'] = e.vunidad.debito;
      //  prod['efectivo'] = e.vunidad.efectivo;
      //  prod['descuento1'] = e.vunidad.descuento1;
      //  prod['descuento2'] = e.vunidad.descuento2;
      //  prod['base'] = Math.ceil(e.vinput.base/e.unidades/e.peso);
      //  prod['lista'] = Math.ceil(e.vinput.lista/e.unidades/e.peso);
      //  prod['reposicion'] = Math.ceil(e.vinput.reposicion/e.unidades/e.peso);
      //  prod['pesable'] = 1
      //  prod['coeficiente'] = 1/e.peso;
      //  prod['unidades'] = 1
      //  productos.push(prod);
      //}
      //art['productos'] = productos;
      tempData.push(art);
    }
    this.readData = tempData;
    //this.newData = tempData;
  }

  async importArticulos(){
    let promesas = [];
    try {
      //const lista:any = await this.procesaLista.checkLista(this.loadedfile);
      //console.log(lista);
      let productoNuevo = 0;
      let precioNuevo = 0;
//      for (const reg of this.newData) {
      for (const reg of this.readData) {
          const producto:any = await this.procesaLista.addArticulo(reg);
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
      console.log(`Productos en Lista: ${this.readData.length} - Nuevos: ${productoNuevo}`)
    } catch (error) {
      console.log(error);
    }
  }

  async importProductos(){
    let promesas = [];
    try {
      //const lista:any = await this.procesaLista.checkLista(this.loadedfile);
      //console.log(lista);

      let productoNuevo = 0;
      let errorCount = 0;
      let savedCount = 0;
      const addedData = [];
      const savedData = [];
      const errorData = [];

      let cancelMsg = false;

      const modalRef = this.modalService.open(ProgressUpdateComponent, {
        ariaLabelledBy: 'modal-basic-title'
        , size: 'xl'
        , keyboard: false
        //, windowClass: 'xlModal'
        , scrollable: false
        , centered: true
        , backdrop : 'static'
        //, backdrop: true
      });

      modalRef.result.then(async (result) => {
        if (result) {
          console.log("normal", result)
          switch (result) {
            case 'nuevos':
              this.newData = await this.loadData(addedData);
              break;
            case 'error':
              //console.log(errorData);
              this.newData = await this.loadData(errorData);
              break;
            default:
              this.newData = await this.loadData(savedData);
              break;
          }
          console.log(this.newData);
        }
      }, result => {
        console.log("dismissed",result);
        switch (result) {
          case 'cancel':
            cancelMsg = true;
            break;
          default:
            break;
        }
      });
      modalRef.componentInstance.max = this.readData.length;
      modalRef.componentInstance.nuevos = addedData.length;
      modalRef.componentInstance.errores = errorCount;

      //modalRef.componentInstance.cancelMsg = cancelMsg;



      for (let index = 0; index < this.readData.length && !cancelMsg; index++) {
        modalRef.componentInstance.value = index+1;//Math.ceil( index * 100 / this.newData.length );
        const reg = this.readData[index];
        const producto:any = await this.procesaLista.addProducto(reg);
        modalRef.componentInstance.setContadores(producto.contadores);

        if(producto.ok === 1){
          if( producto.nuevo === true ) {
            productoNuevo++;
            addedData.push(producto);
            modalRef.componentInstance.nuevos++;// = productoNuevo;
          }
          //else {
          //  //console.log(producto);
          //}
          modalRef.componentInstance.saved++;
          savedData.push(producto);
        } else {
          //console.log(producto);
          modalRef.componentInstance.errores++;
          //errorData.push(producto.savedData);
          //errorData.push(producto.sendData);
          errorData.push(producto);
        }
        //console.log(modalRef.componentInstance.progress);
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
      //modalRef.close();
      console.log(`Productos en Lista: ${this.newData.length} - Nuevos: ${productoNuevo}`)
    } catch (error) {
      console.log(error);
    }
  }

  async loadData(data) {
    const codigos = [];
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      codigos.push(e.savedData._id);
    }
    return await this.procesaLista.getProductos(codigos);
  }
  async initData() {
    try {
      const arrayp: any = await this.personas.fulllist();
      for (let i = 0; i < arrayp.length; i++) {
        arrayp[i]['fullName'] = (`${arrayp[i]['apellido']} ${arrayp[i]['nombre']}`).trim();
      }
      this.dbPersonas = arrayp;
//      console.log("Personas", this.dbPersonas);
    } catch (error) {
      console.log(error);
    }
  }
}
