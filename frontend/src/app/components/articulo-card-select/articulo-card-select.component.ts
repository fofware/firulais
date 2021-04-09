import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { decimales, round } from 'src/app/shared/toolbox';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-articulo-card-select',
  templateUrl: './articulo-card-select.component.html',
  styleUrls: ['./articulo-card-select.component.css']
})
export class ArticuloCardSelectComponent implements OnInit, OnChanges {
  @Input() filter: any;
  @Input() searchItem: string;
  @Input() order: any;
  @Input() listaOrden: number;

/*
  @Input() showStock: boolean;

  @Input() cmpTipo: any;
  @Input() articuloList: any[];

  @Input() ca_pago = 1;
  @Input() ca_persona = 1;
  @Input() ca_lista: any;
*/
  @Output() onCardSelectEvent = new EventEmitter<object>();
  @Output() onNewRegEvent = new EventEmitter<object>();

  wait = false;

  constructor(private http: HttpClient) { }

/*
  setHeight(): void {
    const elMain   = document.getElementById('mainArticulo');
    const elHeader = document.getElementById('headerArticulo');
    const elBrowse = document.getElementById('browseArticulo');

    const h = elMain.parentElement.parentElement.clientHeight;
    const b = h - elHeader.clientHeight;
//    elMain.style.height=`${h}px`
    elBrowse.style.height = `${b}px`;
//    console.log(h,b)
  }
*/
  ngOnInit(): void {
//    console.log('Setting', this.filter);
//    this.cmpTipo = this.cmpTipo.toLowerCase();
//    this.setHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
//    console.log('CARD-SELECT-ON-CHANGE', changes );
  }

  filterEvent(event): void {
  //  console.log('CARD-SELECT-EMIT', event);
    this.onCardSelectEvent.emit(event);
  }

  newRegEvent(ev){
    this.onNewRegEvent.emit(ev);
  }
/*
  opLink(url: string): void {
//    console.log('click link')
    const myWin = window.open(url, 'myWindow');
    event.stopPropagation();
  }

  setAjusteCliente(coeficiente: number): void {
    this.ca_persona = coeficiente;
  }
  setAjustePago(coeficiente: number): void {
    this.ca_pago = coeficiente;
  }
*/
}
