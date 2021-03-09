import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-articulo-card-select-header',
  templateUrl: './articulo-card-select-header.component.html',
  styleUrls: ['./articulo-card-select-header.component.css']
})

export class ArticuloCardSelectHeaderComponent implements OnInit, OnChanges {

  @Input() filter: any;
  @Input() order: any;
  @Input() searchItem: string;
  @Input() listaOrden: number;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCardSelectHeaderEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void  {
    console.log('HEADER-ON-CHANGE');
    console.log(changes);
    this.onCardSelectHeaderEvent.emit({ changes });
  }

  filterEvent(event: any): void {
    console.log('HEADER-EVENT');
//    console.log(event);
    this.onCardSelectHeaderEvent.emit( event );
  }
}
