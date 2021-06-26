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
  productos = []

  constructor() { }
  ngOnInit(): void {
    this.productos = JSON.parse(JSON.stringify(this.articulo.productos));

    for (let i = 0; i < this.productos.length; i++) {
      const e = this.productos[i];
      let reventa = 30;
      if(e.count_cerrado === 0){
        this.productos[i].precioxunidad = Math.round(e.sub.compra/e.sub.contiene/e.contiene);
        this.productos[i].showCompra = Math.round(e.sub.compra/e.sub.contiene);
        this.productos[i].showStock = Math.round(e.sub.stock*e.sub.contiene);
        reventa = e.sub.margen;
      }
      else if(e.count_parte === 0){
        this.productos[i].precioxunidad = Math.round(e.sub.compra/e.sub.contiene);
        this.productos[i].showCompra = Math.round(e.sub.compra/e.sub.contiene);
        this.productos[i].showStock = Math.round(e.sub.stock*e.sub.contiene);
      } else {
        this.productos[i].precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
        this.productos[i].showCompra = Math.round(e.compra/e.contiene);
      }
      const recargo = (e.margen+100)*.01;
      this.productos[i].lista = Math.ceil(Math.ceil((e.compra || this.productos[i].showCompra)*recargo)*1.0751);
      if(e.psable === true){
        this.productos[i].showPrecio = Math.ceil( ((e.compra || this.productos[i].showCompra)*recargo));
      } else {
        this.productos[i].showPrecio = Math.ceil( ((e.compra || this.productos[i].showCompra)*recargo)/10)*10;
      }
      const reventa1 = 11.5
      this.productos[i].reventa = Math.ceil(((e.compra || this.productos[i].showCompra)*((reventa/3*2)+100)/100));
      this.productos[i].reventa1 = Math.ceil(((e.compra || this.productos[i].showCompra)*((reventa/3*1.5)+100)/100));
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
