import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-products-card-view-uno',
  templateUrl: './products-card-view-uno.component.html',
  styleUrls: ['./products-card-view-uno.component.css']
})
export class ProductsCardViewUnoComponent implements OnInit, OnChanges {

  @Input() articulo: any;
  @Input() showStock: any;
  @Input() cmpTipo: any;

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
