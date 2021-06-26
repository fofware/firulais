import { Component, Input, OnInit } from '@angular/core';
import { round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-prod-card-view-dos',
  templateUrl: './prod-card-view-dos.component.html',
  styleUrls: ['./prod-card-view-dos.component.css']
})
export class ProdCardViewDosComponent implements OnInit {

  @Input() articulo: any;
  @Input() showStock: any;
  @Input() cmpTipo: any;
  @Input() idx: number;
  constructor() { }

  ngOnInit(): void {

    const e = this.articulo;
    let reventa = 30;
    if(e.count_cerrado === 0){
      this.articulo.precioxunidad = Math.round(e.sub.compra/e.sub.contiene/e.contiene);
      this.articulo.showCompra = Math.round(e.sub.compra/e.sub.contiene);
      this.articulo.showStock = Math.round(e.sub.stock*e.sub.contiene);
      reventa = e.sub.margen;
    }
    else if(e.count_parte === 0){
      this.articulo.precioxunidad = Math.round(e.sub.compra/e.sub.contiene);
      this.articulo.showCompra = Math.round(e.sub.compra/e.sub.contiene);
      this.articulo.showStock = Math.round(e.sub.stock*e.sub.contiene);
    } else {
      this.articulo.precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
      this.articulo.showCompra = Math.round(e.compra/e.contiene);
    }
    const recargo = (e.margen+100)*.01;
    this.articulo.lista = Math.ceil(Math.ceil((e.compra || this.articulo.showCompra)*recargo)*1.0751);
    if(e.psable === true){
      this.articulo.showPrecio = Math.round( ((e.compra || this.articulo.showCompra)*recargo));
    } else {
      this.articulo.showPrecio = Math.ceil( ((e.compra || this.articulo.showCompra)*recargo)/10)*10;
    }
    const reventa1 = 11.5
    this.articulo.reventa = Math.ceil(((e.compra || this.articulo.showCompra)*((reventa/3*2)+100)/100));
    this.articulo.reventa1 = Math.ceil(((e.compra || this.articulo.showCompra)*((reventa/3*1.5)+100)/100));


    this.articulo.precioref = round(this.articulo.precioToShow/this.articulo.contiene,2)
  }

}
