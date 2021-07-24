import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { productosToShow, round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-articulo-card-view-guest',
  templateUrl: './articulo-card-view-guest.component.html',
  styleUrls: ['./articulo-card-view-guest.component.css']
})
export class ArticuloCardViewGuestComponent implements OnInit {

  @Input() articulo: any;
  @Input() cmpTipo: any;
  @Input() publico: any;
  @Input() idx: number;
  @Output() onSelectArticulo = new EventEmitter<object>();
  productos = []

  constructor() { }
  ngOnInit(): void {

    //this.productos = JSON.parse(JSON.stringify(this.articulo.productos));

    this.productos = this.articulo.productos;

    for (let i = 0; i < this.productos.length; i++) {
      const e = productosToShow(this.productos[i]);
    }

  }


  ngOnChanges(changes: SimpleChanges): void {
/*
    console.log('CARD-VIEW-UNO-CHANGES', changes);
    for (const propName in changes) {
      console.log(propName,changes[propName]);
    }
*/
  }


  opLink(url: string): void {
    const myWin = window.open(url, 'myWindow');
    event.stopPropagation();
  }
  round(valor: number ): number {
    return round( valor, 2);
  }
}
