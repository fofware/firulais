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

  personaList:any = [];
  fullList: any = [];
  collectionSize = 0;
  page = 1;
  pageSize = 20;
  modalsNumber = 0;
  editedPersona = null;
  selectedPersona = {};

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
    this.personaList = data;
    this.fullList = data;
    this.collectionSize = this.personaList.length;
    this.page = 1;
    console.log(this.personaList)
  }
  edit(idx){
    console.log(this.personaList[idx]);
    this.editedPersona = idx;

    this.selectedPersona = JSON.parse(JSON.stringify(this.personaList[idx]));
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
        this.personaList[this.editedPersona] = modalRef.componentInstance.selectedPersona;
      }
    });

  }

  /*
  filter(){
    var output =  employees.filter(employee => employee.department == "IT");
    for(var i=0;i<output.length;i++){
       document.write("<h2>", output[i].name, "</h2>", "<br/>")
    };
  }
  */

  filter(value: string): void {
    console.log("filter",value);
    console.log(this.fullList);
    this.searchItem = value;
    if(value.trim().length === 0) this.personaList = JSON.parse(JSON.stringify(this.fullList));
    else this.personaList = this.fullList.filter( (val) => (val.apellido+ ' '+ val.nombre).trim().toLowerCase().includes(value));
    this.collectionSize = this.personaList.length;
  }

  browseEvent(evt){
    console.log("browseEvent",evt);
    if(evt.page) this.page = evt.page;
    if(evt.ev === 'search') this.searchItem = evt.searchItem;
//    if(evt.ev === 'search') this.filter(evt.searchItem);
  }
}
