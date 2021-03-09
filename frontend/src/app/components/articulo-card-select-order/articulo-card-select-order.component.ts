import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-articulo-card-select-order',
  templateUrl: './articulo-card-select-order.component.html',
  styleUrls: ['./articulo-card-select-order.component.css']
})
export class ArticuloCardSelectOrderComponent implements OnInit, OnChanges {

  @Input() order: any;
  @Input() listaOrden: number;

  @Output() onOrderChangeEvent = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void  {
    console.log('ORDER-ON-CHANGE');
    console.log(changes);
//    this.onCardSelectHeaderEvent.emit({ changes });
  }
  cambioOrden(): void {
    console.log(this.listaOrden);
    this.onOrderChangeEvent.emit( { listaOrden: this.listaOrden } );
  }
  changeOrden(): void {
    this.listaOrden++;
    if ( this.listaOrden >= 5 ) this.listaOrden = 0;
    console.log(this.listaOrden);
    this.onOrderChangeEvent.emit( { listaOrden: this.listaOrden } );
  }
}
