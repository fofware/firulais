import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListasToPrintService } from 'src/app/services/listas-to-print.service';
import { PersonasService } from 'src/app/services/personas.service';
import { PrintService } from 'src/app/services/print.service';
import { PersonaModalFormComponent } from '../persona-modal-form/persona-modal-form.component';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.css']
})
export class PersonasListComponent implements OnInit {
  searchItem: string = "";
  tools = {
    new: { display: true },
    print: {display: true }
  }

//  personaList:any = [];
  fullList: any = [];
  tmpList:any = [];
  collectionSize = 0;
  page = 1;
  pageSize = 10;
  modalsNumber = 0;
  editedPersona = null;
  selectedPersona = {};
  hoja = 1;
  constructor( private http: HttpClient,
              private persona: PersonasService,
              private modalService: NgbModal,
              public printService: PrintService,
              public ltop: ListasToPrintService  )
  {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  async ngOnInit(): Promise<void> {
    const data = await this.persona.fulllist();

    this.fullList = data;
    this.hoja = 1;
    this.page = 1;
    this.tmpList = data;
//    this.personaList = data;
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
    this.personaList = this.personaList.concat(list.slice((this.hoja-1) * this.pageSize , this.hoja * this.pageSize));
    this.hoja=this.hoja+1;
  }
*/
  edit(item){
    console.log(item);
    const reg = {};
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
    console.log("Rntrada",reg);


    for (let i = 0; i < this.fullList.length; i++) {
      if(this.fullList[i]._id === item._id){
        this.selectedPersona = JSON.parse(JSON.stringify(this.fullList[i]));
        this.editedPersona = i;
        break;
      }
    }

    const modalRef = this.modalService.open(PersonaModalFormComponent, {
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
    modalRef.componentInstance.selectedPersona = this.selectedPersona;
    modalRef.result.then( res => {
      console.log("Modal res",res);
      if(res === 'Save'){
        const reg = {};
        for (const key in modalRef.componentInstance.selectedPersona) {
          if (Object.prototype.hasOwnProperty.call(modalRef.componentInstance.selectedPersona, key)) {
            const element = modalRef.componentInstance.selectedPersona[key];
            console.log("Key", key, "value", element);
//            if( key !== 'undefined' ){
              reg[key] = element;
//            }
          } else {
            console.log("Key >>>>>>>", key);
          }
        }
        console.log("Resultado",reg);
//        console.log(modalRef.componentInstance.selectedPersona['[["Prototype"]]']);
        this.fullList[this.editedPersona] = reg;
        item = reg;

        for (let i = 0; i < this.tmpList.length; i++) {
          if( this.tmpList[i]['_id'] === reg['_id'] ){
            this.tmpList[i] = reg;
            console.log("set tmpList",i,this.tmpList[i])
            break;
          }
        }
      }

    });
  }

  newReg(){
    this.selectedPersona = {};
    const modalRef = this.modalService.open(PersonaModalFormComponent, {
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
    modalRef.componentInstance.selectedPersona = this.selectedPersona;
    modalRef.result.then( res => {
      console.log(res);
      if(res === 'Save'){
        //console.log(modalRef.componentInstance.selectedArticulo);
        this.fullList.push(modalRef.componentInstance.selectedPersona);
        this.tmpList.push(modalRef.componentInstance.selectedPersona);
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
//    this.personaList = this.tmpList;
//    this.personaList = [];
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
