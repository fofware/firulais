import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-read-xlsx-file-modal',
  templateUrl: './read-xlsx-file-modal.component.html',
  styleUrls: ['./read-xlsx-file-modal.component.css']
})
export class ReadXlsxFileModalComponent implements OnInit {
  @Input() named: boolean = true;

  chosenFiles: FileList;
  existingFile: File;

  progress = 0;
  msg = '';
  FileDetail: Observable<any>;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  chooseFile(event): void {
    this.chosenFiles = event.target.files;
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
        data[wsname] = sheetData;
      }
    }
    console.log({ wbData, file: this.existingFile, chosenFile: this.chosenFiles })
    this.activeModal.close({ wbData, file: this.existingFile, chosenFile: this.chosenFiles });
  }

  /*
    for (let i = 0; i < wb.SheetNames.length; i++) {
      const wsname = wb.SheetNames[i];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    }



  */
  load(): void {
    this.progress = 0;
    this.existingFile = this.chosenFiles.item(0);
    const reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener('load', () => {
      this.gotData(reader.result);
    }, false);
    reader.readAsBinaryString(this.existingFile);
  }
}
