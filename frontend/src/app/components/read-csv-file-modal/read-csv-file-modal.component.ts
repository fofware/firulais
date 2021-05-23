import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CsvfileService } from 'src/app/services/csvfile.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-read-csv-file-modal',
  templateUrl: './read-csv-file-modal.component.html',
  styleUrls: ['./read-csv-file-modal.component.css']
})
export class ReadCsvFileModalComponent implements OnInit {
  @Input() encode: string;
  @Input() fields: any;
  @Input() typeValues: any;

  chosenFiles: FileList;
  existingFile: File;

  progress = 0;
  msg = '';
  FileDetail: Observable<any>;


  constructor(
    private csv: CsvfileService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.encode = ( this.encode == null ? 'utf8' : this.encode );
  }

  chooseFile(event): void {
    this.chosenFiles = event.target.files;
  }

  async gotData(data: any ) {
    const wbData = {}
    wbData['csv'] = await this.csv.formatData(data);
    this.fields = this.csv.fields;
    this.typeValues = this.csv.fieldsValues;

    console.log({ wbData, file: this.existingFile, chosenFile: this.chosenFiles })
  }

  load(): void {
    this.progress = 0;
    this.existingFile = this.chosenFiles.item(0);
    const reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener('load', () => {
      this.gotData(reader.result);
    }, false);
    reader.readAsText(this.existingFile, this.encode );
  }
}
