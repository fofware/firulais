import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListasToPrintService } from 'src/app/services/listas-to-print.service';
import { PrintService } from 'src/app/services/print.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ProveedoresModalFormComponent } from '../proveedores-modal-form/proveedores-modal-form.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  searchItem: string = "";
  tools = {
    new: { display: true },
    print: {display: true }
  }

//  proveedorList:any = [];
  fullList: any = [];
  tmpList:any = [];
  collectionSize = 0;
  page = 1;
  pageSize = 10;
  modalsNumber = 0;
  editedProveedor = null;
  selectedProveedor = {};
  hoja = 1;
  constructor( private http: HttpClient,
              private proveedor: ProveedorService,
              private modalService: NgbModal,
              public printService: PrintService,
              public ltop: ListasToPrintService  )
  {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  async ngOnInit(): Promise<void> {
    const data = await this.proveedor.list();

    this.fullList = data;
    this.hoja = 1;
    this.page = 1;
    this.tmpList = data;
//    this.proveedorList = data;
    this.collectionSize = this.tmpList.length;

//    this.more(this.tmpList);

//    console.log(this.fullList)
  }

/*
  more(list){
    console.log(this.hoja);
    console.log((this.hoja-1) * this.pageSize);
    console.log(this.hoja * this.pageSize);
    this.collectionSize = list.length;
    this.proveedorList = this.proveedorList.concat(list.slice((this.hoja-1) * this.pageSize , this.hoja * this.pageSize));
    this.hoja=this.hoja+1;
  }
*/
  edit(item){
    console.log(item);
    item = this.tmpList[item];

    /*
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const element = item[key];
        console.log("Key", key, "value", element);
//            if( key !== 'undefined' ){
          reg[key] = element;
//            }
      } else {
        console.log("Key >>>>>>>", key);
      }
    }
    */

    console.log("Rntrada",item);


    for (let i = 0; i < this.fullList.length; i++) {
      if(this.fullList[i]._id === item._id){
        this.selectedProveedor = JSON.parse(JSON.stringify(this.fullList[i]));
        this.editedProveedor = i;
        console.log(this.selectedProveedor);
        break;
      }
    }

    const modalRef = this.modalService.open(ProveedoresModalFormComponent, {
      ariaLabelledBy: 'modal-basic-title'
      , size: 'xl'
      , beforeDismiss: (): boolean | Promise<boolean> => {
        console.log("BeforeDisMiss");
        const ret: boolean = modalRef.componentInstance.checkData();
        return ret;
      }
      //, windowClass: 'xlModal'
      , scrollable: true
      , centered: false
      , backdrop: false
    });
    modalRef.componentInstance.selectedProveedor = this.selectedProveedor;
    modalRef.result.then( res => {
      console.log("Modal res",res);
      if(res === 'Save'){
        const reg = {};
        for (const key in modalRef.componentInstance.selectedProveedor) {
          if (Object.prototype.hasOwnProperty.call(modalRef.componentInstance.selectedProveedor, key)) {
            const element = modalRef.componentInstance.selectedProveedor[key];
            console.log("Key", key, "value", element);
//            if( key !== 'undefined' ){
              reg[key] = element;
//            }
          } else {
            console.log("Key >>>>>>>", key);
          }
        }
        console.log("Resultado",reg);
//        console.log(modalRef.componentInstance.selectedProveedor['[["Prototype"]]']);
        this.fullList[this.editedProveedor] = reg;
        console.log(this.fullList);
        console.log(this.tmpList);
        console.log('item', item)
        console.log('reg', reg)
        item = reg;


        for (let i = 0; i < this.tmpList.length; i++) {
          if( this.tmpList[i]['_id'] === reg['_id'] ){
            this.tmpList[i] = reg;
            console.log("set tmpList",i,this.tmpList[i])
            break;
          }
        }
      }
      this.filter(this.searchItem);

    });
  }

  newReg(){
    this.selectedProveedor = {};
    const modalRef = this.modalService.open(ProveedoresModalFormComponent, {
      ariaLabelledBy: 'modal-basic-title'
      , size: 'xl'
      , beforeDismiss: (): boolean | Promise<boolean> => {
        console.log("BeforeDisMiss");
        const ret: boolean = modalRef.componentInstance.checkData();
        return ret;
      }
      //, windowClass: 'xlModal'
      , scrollable: true
      , centered: false
      , backdrop: false
    });
    modalRef.componentInstance.selectedProveedor = this.selectedProveedor;
    modalRef.result.then( res => {
      console.log(res);
      if(res === 'Save'){
        //console.log(modalRef.componentInstance.selectedArticulo);
        this.fullList.push(modalRef.componentInstance.selectedProveedor);
        this.tmpList.push(modalRef.componentInstance.selectedProveedor);
        this.collectionSize = this.tmpList.length;
      }
    });
  }

  filter(value: string): void {
    console.log("filter",value);
//    console.log( this.tmpList);
    this.searchItem = value;
    let list = []
    if(value.trim().length === 0)  this.tmpList = JSON.parse(JSON.stringify(this.fullList));
    else this.tmpList = this.fullList.filter( (val) => (val.apellido+ ' '+ val.nombre).trim().toLowerCase().includes(value));
    this.hoja=1
    this.page=1
    this.collectionSize = this.tmpList.length;
//    this.proveedorList = this.tmpList;
//    this.proveedorList = [];
//    this.more(this.tmpList);
  }

  browseEvent(evt){
    console.log("browseEvent",evt);
    if(evt.page) this.page = evt.page;
    if(evt.pageSize) this.pageSize = evt.pageSize;
    if(evt.ev === 'search') this.searchItem = evt.searchItem;
    if(evt.ev === 'search') this.filter(evt.searchItem);
    if(evt.ev === 'newReg') this.newReg()
  }
}
