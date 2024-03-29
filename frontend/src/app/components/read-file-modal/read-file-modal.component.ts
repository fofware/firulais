import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-read-file-modal',
  templateUrl: './read-file-modal.component.html',
  styleUrls: ['./read-file-modal.component.css']
})
export class ReadFileModalComponent implements OnInit {
//  @Input() encode: string;

  encode: string = "utf8";
  chosenFiles: FileList;
  existingFile: File;
  data: string;
  progress = 0;
  msg = '';
  FileDetail: Observable<any>;


  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
            ) { }

  ngOnInit(): void {
    this.encode = ( this.encode == null ? 'utf8' : this.encode );
  }

  chooseFile(event): void {
    this.chosenFiles = event.target.files;
  }

  gotData(data: any ): void {
    console.log("Got Data")
    console.log({ data, file: this.existingFile, chosenFile: this.chosenFiles })
    this.data = data;
    this.activeModal.close('load')
  }

/*
  stringToArrayBuffer(str): any {
    if(/[\u0080-\uffff]/.test(str)){
        var arr = new Array(str.length);
        for(var i=0, j=0, len=str.length; i<len; ++i){
            var cc = str.charCodeAt(i);
            if(cc < 128){
                //single byte
                arr[j++] = cc;
            }else{
                //UTF-8 multibyte
                if(cc < 2048){
                    arr[j++] = (cc >> 6) | 192;
                }else{
                    arr[j++] = (cc >> 12) | 224;
                    arr[j++] = ((cc >> 6) & 63) | 128;
                }
                arr[j++] = (cc & 63) | 128;
            }
        }
        var byteArray = new Uint8Array(arr);
    }else{
        var byteArray = new Uint8Array(str.length);
        for(var i = str.length; i--; )
            byteArray[i] = str.charCodeAt(i);
    }
    return byteArray.buffer;
}

arrayBufferToString(buffer): string {
    const byteArray = new Uint8Array(buffer);
    // tslint:disable-next-line:one-variable-per-declaration
    let str = '', cc = 0, numBytes = 0;
    for (let i = 0, len = byteArray.length; i < len; ++i){
        const v = byteArray[i];
        if (numBytes > 0){
            //2 bit determining that this is a tailing byte + 6 bit of payload
            if ((cc&192) === 192){
                //processing tailing-bytes
                cc = (cc << 6) | (v & 63);
            }else{
                throw new Error('this is no tailing-byte');
            }
        }else if (v < 128){
            //single-byte
            numBytes = 1;
            cc = v;
        }else if (v < 192){
            //these are tailing-bytes
            throw new Error('invalid byte, this is a tailing-byte');
        }else if (v < 224){
            //3 bits of header + 5bits of payload
            numBytes = 2;
            cc = v & 31;
        }else if (v < 240){
            //4 bits of header + 4bit of payload
            numBytes = 3;
            cc = v & 15;
        }else{
            //UTF-8 theoretically supports up to 8 bytes containing up to 42bit of payload
            //but JS can only handle 16bit.
            throw new Error('invalid encoding, value out of range');
        }

        if (--numBytes === 0){
            str += String.fromCharCode(cc);
        }
    }
    if (numBytes){
        throw new Error('the bytes don\'t sum up');
    }
    return str;
}
*/

  load(): void {
    this.progress = 0;
    this.existingFile = this.chosenFiles.item(0);
    const reader = new FileReader(); // Creating reader instance from FileReader() API
    reader.addEventListener('load', () => {
      this.gotData(reader.result);
    }, false);
    reader.readAsText(this.existingFile, this.encode );
//    this.chosenFiles = undefined;
  }

}
