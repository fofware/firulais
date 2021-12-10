import { HttpClient } from '@angular/common/http';
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
          this.newData = this.data;
          console.log(this.newData);
          this.collectionSize = this.newData.length;
        }
      });

    }
  }

  async importArticulos(){
    let promesas = [];
    try {
      const lista:any = await this.procesaLista.checkLista(this.loadedfile);
      let productoNuevo = 0;
      let precioNuevo = 0;
      for (const reg of this.newData) {
        const producto:any = await this.procesaLista.addProducto(reg);
        if( producto.new )
          productoNuevo++;

        console.log( producto );
        const setPrecio = {
          proveedor_lista_id: lista._id,
          proveedor_id: reg.proveedor,
          proveedor_articulo: producto._id,
          producto_id: reg.producto,
          lista: reg.lista,
          reposicion: reg.reposicion,
        }
        const precioStatus = await this.procesaLista.setprecio(setPrecio);
        console.log( precioStatus );
      }
      console.log(`Productos en Lista: ${this.newData.length} - Nuevos: ${productoNuevo}`)

    } catch (error) {
      console.log(error);
    }
    /*
    try {
      const result = Promise.all(promesas);
      console.log(result);
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.log(error);
    }
  }
}
