import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
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
