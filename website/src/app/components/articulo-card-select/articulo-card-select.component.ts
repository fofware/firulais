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
  ApiUri = API_URI;
  @Input() setting: any;
  @Input() cmpTipo = 'venta';
  @Input() ca_pago = 1;
  @Input() ca_persona = 1;
  @Input() public = true;
  @Input() ca_lista: any;

  @Output() onArticuloSelect = new EventEmitter<object>();

  articuloList: any[] = [];
  searchItem = '';

  wait = false;

  constructor(private http: HttpClient) {
  }
  setHeight(){
    const elMain   = document.getElementById('mainArticulo');
    const elHeader = document.getElementById('headerArticulo');
    const elBrowse = document.getElementById('browseArticulo');

    const h = elMain.parentElement.parentElement.clientHeight;
    const b = h - elHeader.clientHeight;
//    elMain.style.height=`${h}px`
    elBrowse.style.height = `${b}px`;
//    console.log(h,b)
  }
  ngOnInit(): void {
    console.log('Setting', this.setting);
    this.cmpTipo = this.cmpTipo.toLowerCase();
    this.listArticulos();
    this.setHeight();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    for (const propName in changes) {
      console.log(propName, changes[propName]);
      this.changePrecio();
    }
  }
  eventSearchArticulos(event){
    console.log('eventSearchArticulos', event);
    this.searchItem = event || '';
    this.searchArticulos();
  }
  listArticulos(){
    this.searchItem = ([] as any);
    this.searchArticulos();
  }

  searchArticulos() {
    if (this.wait) { return; }
    this.wait = true;
    const Articulo: any = {};
    const Producto: any = {};
    const Extra: any = {};

    if (this.setting.pesable.value) { Extra.pesable = this.setting.pesable.qry; }
    if (this.setting.private_web.value) { Extra.private_web = this.setting.private_web.qry; }
//    if (this.setting.precio.value) { Producto.precio = this.setting.precio.qry; }
    if (this.setting.stock.value) { Extra.stock = this.setting.stock.qry; }
    if (this.setting.servicio.value) { Producto.servicio = this.setting.servicio.qry; }
    if (this.setting.pCompra.value) { Producto.pCompra = this.setting.pCompra.qry; }
    if (this.setting.pVenta.value) { Producto.pVenta = this.setting.pVenta.qry; }

    this.buscaProductos({Articulo, Producto, Extra, searchItem: this.searchItem,
      Sort: { precio: 1 } }).subscribe(
      res => {
        this.calculaPrecios(res);
        console.log(res);
        const data = res as any;
        // tslint:disable-next-line:no-string-literal
        if ( data.length === 1 && Articulo['$and'] && Articulo['$and'].length === 1
        && ( this.searchItem === data[0].codigo || this.searchItem === data[0].plu ))
        {
          this.onArticuloSelect.emit(data[0]);
          this.searchItem = '';
          this.wait = false;
          this.searchArticulos();
        } else {
          this.articuloList = data;
        }
        this.wait = false;
      },
      err => {
        console.log(err);
        this.wait = true;
      }
    );
  }
  buscaProductos(params: any){
    return new Observable((observer) => {
      this.http.post(`${this.ApiUri}/productos/list`, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
  }
/*
  searchArticulos() {
    if (this.wait) { return; }
    this.wait = true;
    const Articulo = {};
    const Producto = {};
    const Extra = {};

    if (this.searchItem.length > 0) {
      const searchItem = this.searchItem.replace(/  /g, ' ');
      const array: any[] = searchItem.trim().split(' ');

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        array[index] = {name: {$regex: `${element}`, mod: 'i'}};
      }
      Articulo.$and = array;
    }

    if (this.setting.pesable.value) { Extra.pesable = this.setting.pesable.qry; }
    if (this.setting.precio.value) { Producto.precio = this.setting.precio.qry; }
    if (this.setting.stock.value) { Extra.$or = this.setting.stock.qry; }
    if (this.setting.servicio.value) { Producto.servicio = this.setting.servicio.qry; }
    if (this.setting.pCompra.value) { Producto.pCompra = this.setting.pCompra.qry; }
    if (this.setting.pVenta.value) { Producto.pVenta = this.setting.pVenta.qry; }

    this.buscaProductos({Articulo, Producto, Extra}).subscribe(
      res => {
        this.calculaPrecios(res);
        console.log(res);
        const data = res as any;
        if (data.length === 1 && Articulo.$and.length === 1 && (this.searchItem === data[0].codigo || this.searchItem === data[0].plu )){
          this.onArticuloSelect.emit(data[0]);
          this.searchItem = '';
          this.wait = false;
          this.searchArticulos();
        } else {
          this.articuloList = data;
        }
        this.wait = false;
      },
      err => {
        console.log(err);
        this.wait = true;
      }
    );
  }
  buscaProductos(params: any){
    return new Observable((observer) => {
      this.http.post(`${this.ApiUri}/productos/list`, params ).subscribe(res => {
      observer.next(res);
        // observable execution
      observer.complete();
      });
    });
  }
*/
  onClick(p){
    this.onArticuloSelect.emit(p);
//    console.log('click add')
  }
  opLink(url: string){
//    console.log('click link')
    const myWin = window.open(url, 'myWindow');
    event.stopPropagation();
  }
  setAjusteCliente(coeficiente: number){
    this.ca_persona = coeficiente;
  }
  setAjustePago(coeficiente: number){
    this.ca_pago = coeficiente;
  }
  changePrecio(){
    this.calculaPrecios(this.articuloList);
  }
  calculaPrecios(array): void {
/*
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      let neto = 0;
      if (this.ca_lista.margen){
        neto = round( e[this.ca_lista.basePrecio] * ((100 + (e.margen) ) / 100) * this.ca_lista.value, decimales);
      } else {
        neto = round(e[this.ca_lista.basePrecio]  * this.ca_lista.value, decimales);
      }

      e.a_persona = round((neto * this.ca_persona) - neto, decimales);
      const subPrecio = round(neto + e.a_persona, decimales);
      e.a_pago = round((subPrecio * this.ca_pago ) - subPrecio, decimales);
      e.neto = round(neto + e.a_persona + e.a_pago, decimales);
    }
  */
  }
  round(num): number {
    return round(num, decimales);
  }
}
