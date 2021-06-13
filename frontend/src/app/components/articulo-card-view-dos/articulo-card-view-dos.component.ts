import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-articulo-card-view-dos',
  templateUrl: './articulo-card-view-dos.component.html',
  styleUrls: ['./articulo-card-view-dos.component.css']
})
export class ArticuloCardViewDosComponent implements OnInit {
  @Input() stage: any;
  @Input() articulo: any;
  @Input() idx: number;
  @Input() selected: any;
  @Output() onSetArticulo = new EventEmitter<object>();
  @Output() onSetProducto = new EventEmitter<object>();
  productos = []

  constructor() { }

  ngOnInit(): void {
    this.productos = JSON.parse(JSON.stringify(this.articulo.productos));

    for (let i = 0; i < this.productos.length; i++) {
      const e = this.productos[i];
      if(e.count_cerrado === 0){
        this.productos[i].precioxunidad = Math.round(e.sub.compra/e.sub.contiene/e.contiene);
        this.productos[i].showCompra = Math.round(e.sub.compra/e.sub.contiene);
        this.productos[i].showStock = Math.round(e.sub.stock*e.sub.contiene);
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
      this.productos[i].lista = Math.ceil((e.compra || this.productos[i].showCompra)*recargo*1.07);
      if(e.psable === true){
        this.productos[i].showPrecio = Math.ceil( ((e.compra || this.productos[i].showCompra)*recargo));
      } else {
        this.productos[i].showPrecio = Math.ceil( ((e.compra || this.productos[i].showCompra)*recargo)/10)*10;
      }
      this.productos[i].reventa = Math.ceil(((e.compra || this.productos[i].showCompra)*((e.margen/3*2)+100)/100));
      this.productos[i].reventa1 = Math.ceil(((e.compra || this.productos[i].showCompra)*((e.margen/3*1.5)+100)/100));
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
  setArticulo(articulo){
    this.onSetArticulo.emit(articulo)
  }
  setProducto(producto){
    this.onSetProducto.emit(producto)
  }
}
