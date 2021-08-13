import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListasToPrintService } from 'src/app/services/listas-to-print.service';
import { PrintService } from 'src/app/services/print.service';
import { UsersService } from 'src/app/services/users.service';
import { UserModalFormComponent } from '../user-modal-form/user-modal-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchItem: string = "";
  tools = {
    new: { display: true },
    print: {display: true }
  }

//  UserList:any = [];
  fullList: any = [];
  tmpList:any = [];
  collectionSize = 0;
  page = 1;
  pageSize = 10;
  modalsNumber = 0;
  editedUser = null;
  selectedUser = {};
  hoja = 1;

  constructor( private http: HttpClient,
    private users: UsersService,
    private modalService: NgbModal,
    public printService: PrintService,
    public ltop: ListasToPrintService) {
      this.modalService.activeInstances.subscribe((list) => {
        this.modalsNumber = list.length;
      });
    }

  async ngOnInit(): Promise<void> {
    const data = await this.users.fulllist();

    this.fullList = data;
    this.hoja = 1;
    this.page = 1;
    this.tmpList = data;
    this.collectionSize = this.tmpList.length;
    console.log(this.fullList)
  }

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
    console.log("Reentrada",reg);


    for (let i = 0; i < this.fullList.length; i++) {
      if(this.fullList[i]._id === item._id){
        this.selectedUser = JSON.parse(JSON.stringify(this.fullList[i]));
        this.editedUser = i;
        break;
      }
    }

    const modalRef = this.modalService.open(UserModalFormComponent, {
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
    modalRef.componentInstance.selectedUser = this.selectedUser;
    modalRef.result.then( res => {
      console.log("Modal res",res);
      if(res === 'Save'){
        const reg = {};
        for (const key in modalRef.componentInstance.selectedUser) {
          if (Object.prototype.hasOwnProperty.call(modalRef.componentInstance.selectedUser, key)) {
            const element = modalRef.componentInstance.selectedUser[key];
            console.log("Key", key, "value", element);
              reg[key] = element;
          } else {
            console.log("Key >>>>>>>", key);
          }
        }
        this.fullList[this.editedUser] = reg;
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
    this.selectedUser = {};
    const modalRef = this.modalService.open(UserModalFormComponent, {
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
    modalRef.componentInstance.selectedUser = this.selectedUser;
    modalRef.result.then( res => {
      console.log(res);
      if(res === 'Save'){
        //console.log(modalRef.componentInstance.selectedArticulo);
        this.fullList.push(modalRef.componentInstance.selectedUser);
        this.tmpList.push(modalRef.componentInstance.selectedUser);
        this.collectionSize = this.tmpList.length;
      }
    });
  }

  filter(value: string): void {
    this.searchItem = value;
    let list = []
    if(value.trim().length === 0)  this.tmpList = JSON.parse(JSON.stringify(this.fullList));
    else this.tmpList = this.fullList.filter( (val) => (val.apellido+ ' '+ val.nombre).trim().toLowerCase().includes(value));
    this.hoja=1
    this.page=1
    this.collectionSize = this.tmpList.length;
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
