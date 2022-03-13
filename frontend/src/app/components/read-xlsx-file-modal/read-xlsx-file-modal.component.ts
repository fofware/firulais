import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ListasProveedoresService } from 'src/app/services/listas-proveedores.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-read-xlsx-file-modal',
  templateUrl: './read-xlsx-file-modal.component.html',
  styleUrls: ['./read-xlsx-file-modal.component.css']
})
export class ReadXlsxFileModalComponent implements OnInit {
  @Input() named: boolean = true;
  @Input() proveedor;

  chosenFiles: FileList;
  existingFile: File;
  fileInDb:any;
  dataChanged:{file:boolean, date:boolean, saveData: boolean } = {file:false,date:false, saveData: false};
  lastModifiedDate;
  progress = 0;
  msg = '';
  FileDetail: Observable<any>;
  setDate;
  fechaInputValue;
  saveData: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private procesaLista: ListasProveedoresService,
    ) { }

  ngOnInit(): void {
    this.setDate = this.DateToInput();
  }

  async chooseFile(event) {
    this.chosenFiles = event.target.files;
    this.existingFile = this.chosenFiles.item(0);
    this.lastModifiedDate = new Date(this.existingFile.lastModified).toISOString();
    const filter = {
			name: this.existingFile.name,
			proveedor_id: this.proveedor._id
    };
    console.log("filter",filter);
    const defdata = {
      name: this.existingFile.name
      ,type: this.existingFile.type
      ,lastModified: this.existingFile.lastModified
      ,size: this.existingFile.size
      ,proveedor_id: this.proveedor._id
      ,vigencia: this.setFecha()
    }
    this.fileInDb = await this.procesaLista.checkLista(filter) || defdata;
    this.dataChanged.saveData = this.fileInDb._id ? false : true;
    //if(!this.fileInDb.vigencia){
    //  this.setDate = this.DateToInput();
    //} else {
      this.setDate = this.DateToInput(this.fileInDb.vigencia);
      this.fechaInputValue = this.DateToInput(this.fileInDb.vigencia);
      this.dataChanged.file = this.isChangedFile();
      this.dataChanged.date = false;
      //console.log(this.fileInDb.vigencia,this.fechaInputValue);
    //}
    //console.log("fileInDb", this.fileInDb);
    //console.log(this.setDate);
    //console.log(this.fechaInputValue);
  }

  isChangedFile(){
    if(this.fileInDb.lastModified !== this.existingFile.lastModified) return true;
    if(this.fileInDb.size !== this.existingFile.size) return true;
    return false;
  }

  gotData(data: any ): void {
    const wb: XLSX.WorkBook = XLSX.read(data, {type: 'binary'});
    const wbData = {};
    for (let i = 0; i < wb.SheetNames.length; i++) {
      const wsname = wb.SheetNames[i];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      if(this.named){
        wbData[wsname] = (XLSX.utils.sheet_to_json( ws ));
      } else {
        const sheetData = (XLSX.utils.sheet_to_json( ws, { header: 1} ))
        wbData[wsname] = sheetData;
      }
    }
    this.activeModal.close({ action: "upload",wbData, wb, changed: this.dataChanged, dbData: this.fileInDb, file: this.existingFile, chosenFile: this.chosenFiles });
  }

  setFecha(strDate?) {
    const d = !strDate ? new Date() : new Date(strDate);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d.getTime();
  }

  checkFecha(){
    this.dataChanged.date = this.DateToInput(this.fileInDb.vigencia) !== this.setDate ? true : false;
  }

  DateToInput(miliseconds?){
    const d = !miliseconds ? new Date() : new Date(miliseconds);
    const mm = ((d.getMonth()+1)+'').length === 1 ? `0${d.getMonth()+1}` : `${d.getMonth()+1}`;
    const dd = ((d.getDate())+'').length === 1 ? `0${d.getDate()}` : `${d.getDate()}`;
    return `${d.getFullYear()}-${mm}-${dd}`
  }

  cancel(){
    this.activeModal.close({ action: "cancel" });
  }

  resetVigencia(){
    this.activeModal.close({ action: 'vigencia', changed: this.dataChanged, dbData: this.fileInDb});
  }

  async load() {
    this.progress = 0;
    this.fileInDb.vigencia = this.setFecha(this.setDate);
    const reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener('load', () => {
      this.gotData(reader.result);
    }, false);
    reader.readAsBinaryString(this.existingFile);
  }
}
