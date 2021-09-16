import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-articulos-list-card-view',
  templateUrl: './articulos-list-card-view.component.html',
  styleUrls: ['./articulos-list-card-view.component.css']
})
export class ArticulosListCardViewComponent implements OnInit, OnChanges {

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
  sub(str:string,len):string {
    if(!str || str.length === 0) return "Un";
    return str.substr(0,len);
  }

  editdata(){
    console.log(this.articulo);
    this.onSelectArticulo.emit({idx: this.idx, articulo: this.articulo})
  }
}
