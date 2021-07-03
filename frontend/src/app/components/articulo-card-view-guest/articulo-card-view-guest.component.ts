import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { round } from 'src/app/shared/toolbox';

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
//    this.productos = JSON.parse(JSON.stringify(this.articulo.productos));
    this.productos = this.articulo.productos;

    for (let i = 0; i < this.productos.length; i++) {
      const e = this.productosToShow(this.productos[i]);
/*
      let reventa = 30;
      if(e.count_cerrado === 0){
        this.productos[i].precioxunidad = Math.round(e.sub.compra/e.sub.contiene/e.contiene);
        this.productos[i].showCompra = Math.round(e.sub.compra/e.sub.contiene);
        this.productos[i].showStock = Math.floor(e.sub.stock*e.sub.contiene);
        reventa = e.sub.margen;
      }
      else if(e.count_parte === 0){
        this.productos[i].precioxunidad = Math.round(e.sub.compra/e.sub.contiene);
        this.productos[i].showCompra = Math.round(e.sub.compra/e.sub.contiene);
        this.productos[i].showStock = Math.floor(e.sub.stock*e.sub.contiene);
      } else if(e.count_ins){
        this.productos[i].precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
        this.productos[i].showCompra = Math.round(e.compra/e.contiene);
        this.productos[i].showStock = Math.floor(e.stock);
        this.productos[i].stock = 0;
      } else {
        this.productos[i].precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
        this.productos[i].showCompra = Math.round(e.compra/e.contiene);
        this.productos[i].showStock = Math.floor(e.stock);
      }
      const recargo = (e.margen+100)*.01;
      this.productos[i].lista = Math.ceil(Math.ceil((e.compra || this.productos[i].showCompra)*recargo)*1.08);
      if(e.psable === true){
        this.productos[i].showPrecio = Math.ceil( ((e.compra || this.productos[i].showCompra)*recargo));
      } else {
        this.productos[i].showPrecio = Math.ceil( ((e.compra || this.productos[i].showCompra)*recargo)/10)*10;
      }
      const reventa1 = 11.5
      this.productos[i].reventa = Math.ceil(((e.compra || this.productos[i].showCompra)*((reventa/3*2)+100)/100));
      this.productos[i].reventa1 = Math.ceil(((e.compra || this.productos[i].showCompra)*((reventa/3*1.5)+100)/100));
    */
    }
  }

  productosToShow(e){
    let reventa = 30;
    if(e.count_cerrado === 0){
      e.precioxunidad = Math.round(e.sub.compra/e.sub.contiene/e.contiene);
      e.showCompra = Math.round(e.sub.compra/e.sub.contiene);
      e.showStock = Math.floor(e.sub.stock*e.sub.contiene);
      reventa = e.sub.margen;
    }
    else if(e.count_parte === 0){
      e.precioxunidad = Math.round(e.sub.compra/e.sub.contiene);
      e.showCompra = Math.round(e.sub.compra/e.sub.contiene);
      e.showStock = Math.floor(e.sub.stock*e.sub.contiene);
    } else if(e.count_ins){
      e.precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
      e.showCompra = Math.round(e.compra/e.contiene);
      e.showStock = Math.floor(e.stock);
      e.stock = 0;
    } else {
      e.precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
      e.showCompra = Math.round(e.compra/e.contiene);
      e.showStock = Math.floor(e.stock);
    }
    const recargo = (e.margen+100)*.01;
    e.lista = Math.ceil(Math.ceil((e.compra || e.showCompra)*recargo)*1.08);
    if(e.pesable === true){
      e.showPrecio = Math.ceil( ((e.compra || e.showCompra)*recargo));
    } else {
      e.showPrecio = Math.ceil( ((e.compra || e.showCompra)*recargo)/10)*10;
    }
    const reventa1 = 11.5
    e.reventa = Math.ceil(((e.compra || e.showCompra)*((reventa/3*2)+100)/100));
    e.reventa1 = Math.ceil(((e.compra || e.showCompra)*((reventa/3*1.5)+100)/100));
    return e;
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
