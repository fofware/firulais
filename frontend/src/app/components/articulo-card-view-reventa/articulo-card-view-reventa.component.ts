import { Component, Input, OnInit } from '@angular/core';
import { productosToShow, round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-articulo-card-view-reventa',
  templateUrl: './articulo-card-view-reventa.component.html',
  styleUrls: ['./articulo-card-view-reventa.component.css']
})
export class ArticuloCardViewReventaComponent implements OnInit {

  @Input() articulo: any;
  productos = []

  constructor() { }
  ngOnInit(): void {
    //this.productos = JSON.parse(JSON.stringify(this.articulo.productos));

    this.productos = this.articulo.productos;

    for (let i = 0; i < this.productos.length; i++) {
      const e = productosToShow(this.productos[i]);
    }
  }


  opLink(url: string): void {
    const myWin = window.open(url, 'myWindow');
    event.stopPropagation();
  }
  round(valor: number ): number {
    return round( valor, 2);
  }

/*
  editdata(){
    console.log(this.articulo);
    this.onSelectArticulo.emit({idx: this.idx, articulo: this.articulo})
  }
*/
}
