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
    {name: "Descuento en Efectivo",icon:'far fa-money-bill-alt',value: 1, coef: [{comiMP: 0, op: 1}, {RetImpIngBru: 0, op: 1 }] }
  //  ,{name: "QR.Efectivo",icon:'far fa-money-bill-alt',value: 1.043008, coef: [{comiMP: 0.00968, op: 1}, { RetImpIngBru: 0.033328, op: 1 }] }
  //  ,{name: "QR.Debito",icon:'far fa-money-bill-alt',value: 1.045328, coef: [ { comiMP: 0.012, op: 1}, { RetImpIngBru: 0.033328, op: 1 }] }
  //  ,{name: "QR.Crédito",icon:'far fa-credit-card', value: 1.103387, coef: [ { comiMP: 0.070059, op: 1 }, { RetImpIngBru: 0.033328, op: 1 } ] }
    ,{name: "Trj.Débito",icon:'fas fa-money-check', value: 1.0778521857, coef: [ {comiMP: 0.039803256, op: 1 }, { RetImpIngBru: 0.033328, op: 1 } ] }
    ,{name: "Trj.Crédito",icon:'far fa-credit-card', value: 1.120220997, coef: [ { comiMP: 0.0778898, op: 1 }, { RetImpIngBru: 0.033328, op: 1 } ] }
  ]

  constructor() { }

  ngOnInit(): void {
  }
  cambioFpago(){
    this.onPagoChange.emit( this.listaPago[this.fpago] );

  }
}
