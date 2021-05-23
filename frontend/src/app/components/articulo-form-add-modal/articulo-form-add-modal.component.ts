import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-articulo-form-add-modal',
  templateUrl: './articulo-form-add-modal.component.html',
  styleUrls: ['./articulo-form-add-modal.component.css']
})
export class ArticuloFormAddModalComponent implements OnInit {
  @Input() titulo;
  @Input() contenido;
//  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal
              ) { }

  ngOnInit(): void {
  }

  passBack(){
    this.activeModal.close({retData: "asdfadsfasdfasdf"});
  }
}
