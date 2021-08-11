import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productosToShow } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-articulo-card-view-guest-small',
  templateUrl: './articulo-card-view-guest-small.component.html',
  styleUrls: ['./articulo-card-view-guest-small.component.css']
})
export class ArticuloCardViewGuestSmallComponent implements OnInit {

  @Input() articulo: any;
  @Input() showStock: any;
  @Input() cmpTipo: any;
  @Input() idx: number;
  @Output() onSelectArticulo = new EventEmitter<object>();
  productos = []

  constructor() { }

  ngOnInit(): void {
    this.productos = this.articulo.productos;

    for (let i = 0; i < this.productos.length; i++) {
      const e = productosToShow(this.productos[i]);
    }
  }

}
