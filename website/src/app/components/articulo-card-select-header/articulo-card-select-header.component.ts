import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-articulo-card-select-header',
  templateUrl: './articulo-card-select-header.component.html',
  styleUrls: ['./articulo-card-select-header.component.css']
})
export class ArticuloCardSelectHeaderComponent implements OnInit, OnChanges {

  @Input() setting: any;
  @Input() searchItem: string;
  @Input() articuloList: any[];
  @Output() onSearchArticulos = new EventEmitter<object>();

  wait: boolean = false;
  ApiUri = API_URI;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  searchArticulos(){
    const searchItem = this.searchItem;
    console.log("SearchArticulos Emir",searchItem);
    this.onSearchArticulos.emit({ searchItem })
  }
  /*
  searchArticulos() {
    console.log(this.searchItem);
    if (this.wait) return;
    this.wait = true;
    let Articulo = {};
    let Producto = {};
    let Extra = {};

    if (this.headSearchItem.length > 0) {
      let headSearchItem = this.headSearchItem.replace(/  /g, " ");
      const array:any[] = headSearchItem.trim().split(" ");

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        array[index] = {name: {$regex:`${element}`, mod:'i'}}
      }
      Articulo['$and']= array;
    }

    if(this.setting.pesable.value) Extra['pesable'] = this.setting.pesable.qry;
    if(this.setting.precio.value) Producto['precio'] = this.setting.precio.qry;
    if(this.setting.stock.value) Extra['$or'] = this.setting.stock.qry;
    if(this.setting.servicio.value) Producto['servicio'] = this.setting.servicio.qry;
    if(this.setting.pCompra.value) Producto['pCompra'] = this.setting.pCompra.qry;
    if(this.setting.pVenta.value) Producto['pVenta'] = this.setting.pVenta.qry;

    this.buscaProductos({Articulo,Producto,Extra}).subscribe(
      res => {
  //      this.calculaPrecios(res);
        console.log(res)
        const data = <any>res
*/
/*
        if(data.length == 1 && Articulo['$and'].length == 1 && (this.headSearchItem == data[0].codigo || this.headSearchItem == data[0].plu )){
          this.onArticuloSelect.emit(data[0]);
          this.headSearchItem = "";
          this.wait = false;
           this.searchArticulos();
        } else {
          this.articuloList = data;
        }
*/
/*
        this.articuloList = data;
        this.wait = false;
      },
      err => {
        console.log(err);
        this.wait = true;
      }
    )
  }
  buscaProductos(params:any){
    return new Observable((observer) => {
      this.http.post(`${this.ApiUri}/productos/list`, params ).subscribe(res => {
      observer.next(res)
        // observable execution
        observer.complete()
      })
    })
  }
    */
}
