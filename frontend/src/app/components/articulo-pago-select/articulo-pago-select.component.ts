import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-articulo-pago-select',
  templateUrl: './articulo-pago-select.component.html',
  styleUrls: ['./articulo-pago-select.component.css']
})
export class ArticuloPagoSelectComponent implements OnInit {
  @Input() fpago: any;
  @Output() onPagoChange = new EventEmitter<object>();

  listaPago = [
    {name: "Efectivo",icon:'far fa-money-bill-alt',value: 1, coef: [] }
    ,{name: "Trj.Débito",icon:'fas fa-money-check', value: 1.0750433, coef: [ {comiMP: 0.039803256, op: 1 }, {RetImpIngBru: 0.033328, op: 1 } ] }
    ,{name: "Trj.Crédito",icon:'far fa-credit-card', value: 1.1126126, coef: [ {comiMP: 0.0778898, op: 1 }, {RetImpIngBru: 0.033328, op: 1 } ] }
  ]

  constructor() { }

  ngOnInit(): void {
  }
  cambioFpago(){
    this.onPagoChange.emit( this.listaPago[this.fpago] );

  }
}
