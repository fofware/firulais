import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-articulo-card-select-box-list',
  templateUrl: './articulo-card-select-box-list.component.html',
  styleUrls: ['./articulo-card-select-box-list.component.css']
})
export class ArticuloCardSelectBoxListComponent implements OnInit, OnChanges {
  @Input() articuloList: any[];
  @Input() cmpTipo: any;
  @Input() publico: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
//    console.log('BOX-LIST-CHANGES', changes);
/*
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
