import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-articulo-card-view-uno',
  templateUrl: './articulo-card-view-uno.component.html',
  styleUrls: ['./articulo-card-view-uno.component.css']
})
export class ArticuloCardViewUnoComponent implements OnInit, OnChanges {

  @Input() articulo: any;
  @Input() cmpTipo: any;
  @Input() publico: any;
  @Input() idx: number;
  @Output() onSelectArticulo = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.articulo.productos.length; i++) {
      const e = this.articulo.productos[i];
      this.articulo.productos[i].lista = Math.ceil(e.precio*1.07);
      this.articulo.productos[i].reventa = Math.ceil((e.compra*((e.margen/3*2)+100)/100));
      this.articulo.productos[i].reventa1 = Math.ceil((e.compra*((e.margen/3*1)+100)/100));
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

  editdata(){
    console.log(this.articulo);
    this.onSelectArticulo.emit({idx: this.idx, articulo: this.articulo})
  }
}
