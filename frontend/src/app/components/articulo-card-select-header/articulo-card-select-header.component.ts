import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-articulo-card-select-header',
  templateUrl: './articulo-card-select-header.component.html',
  styleUrls: ['./articulo-card-select-header.component.css']
})

export class ArticuloCardSelectHeaderComponent implements OnInit, OnChanges {

  @Input() filter: any;
  @Input() filterButtons: any;
  @Input() order: any;
  @Input() searchItem: string;
  @Input() listaOrden: number;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCardSelectHeaderEvent = new EventEmitter<any>();
  @Output() onNewRegEvent = new EventEmitter<any>();
  @Output() onButtonMsg = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log('botones', this.filterButtons)
  }

  ngOnChanges(changes: SimpleChanges): void  {
//    console.log('HEADER-ON-CHANGE');
//    console.log(changes);
    this.onCardSelectHeaderEvent.emit({ changes });
  }

  filterEvent(event: any): void {
//    console.log('HEADER-EVENT');
//    console.log(event);
    this.onCardSelectHeaderEvent.emit( event );
  }
  buttonsMsg(buttons){
    console.log(buttons);
    this.onButtonMsg.emit(buttons);
  }
  toolsNewReg( ev ){
    this.onNewRegEvent.emit( ev );
  }
}
