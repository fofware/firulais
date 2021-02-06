import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { round } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-articulo-card-select-box-list',
  templateUrl: './articulo-card-select-box-list.component.html',
  styleUrls: ['./articulo-card-select-box-list.component.css']
})
export class ArticuloCardSelectBoxListComponent implements OnInit, OnChanges {
  @Input() setting: any;
  @Input() cmpTipo: string = 'venta';
  @Input() ca_pago: number = 1;
  @Input() ca_persona: number = 1;
  @Input() publico: boolean = true;
  @Input() articuloList: any[] = [];

  @Output() onArticuloSelect = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    for (const propName in changes) {
      console.log(propName,changes[propName]);
    }
  }


  onClick(p){
//    console.log('click add')
    this.onArticuloSelect.emit(p)
  }
  opLink(url:string){
//    console.log('click link')
    const myWin = window.open(url,'myWindow');
    event.stopPropagation();
  }
  round(valor){
    return round(valor,2)
  }
}
