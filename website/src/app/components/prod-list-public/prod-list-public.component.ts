import { Component, OnInit } from '@angular/core';
import { tpLista } from 'src/app/shared/toolbox';

@Component({
  selector: 'app-prod-list-public',
  templateUrl: './prod-list-public.component.html',
  styleUrls: ['./prod-list-public.component.css']
})
export class ProdListPublicComponent implements OnInit {
  lista = tpLista;
  constructor() { }
  cmpSetting = {
    tipo: "Venta",
    public: true
  };

  articuloSetting = {
    pesable: { value: false,  display: true, qry: true }
  , precio: { value: true, display: false,  qry: { $gt: 0 }}
  , stock:  { value: true, display: true,  qry: { $gte: 1 }}
  , servicio: { value: false, display: false, qry: {$eq: true} }
  , pCompra: { value: false, display: false, qry: { $eq: true }}
  , pVenta: { value: true, display: false, qry: { $eq: true }}
  , private_web: { value: true, display: true, qry: { $not: { $eq: true } } }
   };
   showArticulos: boolean = true;

  ngOnInit(): void {
  }
  addProducto(event){

  }
}
