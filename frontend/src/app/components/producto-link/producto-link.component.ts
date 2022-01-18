import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { IArticulo } from 'src/app/models/i-articulo';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ListasProveedoresService, proveedoresSettings } from 'src/app/services/listas-proveedores.service';

import { API_URI } from 'src/app/shared/uris';
import { ArticulosLinkService } from 'src/app/services/articulos-link.service';

@Component({
  selector: 'app-producto-link',
  templateUrl: './producto-link.component.html',
  styleUrls: ['./producto-link.component.css']
})
export class ProductoLinkComponent implements OnInit {
  provSettings = proveedoresSettings;
  proveedor = 0;
  itemSearchProducto = "";
  itemSearchProdProv = "";
  tmpList = [];
  filtro = {
    proveedor: null,
    nombre: null,
    fabricante: null,
    marca: null,
    name: null,
    especie: null,
    edad: null,
    raza: null,
    rubro: null,
    linea: null,
    itemSearchProdProv: null,
    unidades: null,
    peso: null,
    link: true
  };
  active;
  stage = 0;
  disabled = true;
  dbProducto:any[] = [];
  dbProvProd = [];
  selected = [];
  readyData = [];
  selectedData: [{
    idx: number;
    fabricante?: string;
    marca?: string;
    rubro?: string;
    linea?: string;
    especie?: string;
    edad?: string;
    raza?: string;
    name?: string;
    d_fabricante?: boolean;
    d_marca?: boolean;
    d_rubro?: boolean;
    d_linea?: boolean;
    d_especie?: boolean;
    d_edad?: boolean;
    d_raza?: boolean;
    private_web?: boolean;
    image?: string;
    url?: string;
    iva?: number;
    margen?: number;
    tags?: string;
  }]

  constructor(
    private producto: ProductosService,
    private provprod: ListasArtProdService,
    private artprov: ArticulosLinkService
  ) { }

  async ngOnInit() {
    this.setHeight();
/*
    const retProducto:any = await this.producto.lista();
    this.dbProducto = retProducto;
*/
    this.stage = 0;
    this.readyData = [];
    this.dbProducto = [];
    //this.filtrar();
    console.log(this.dbProducto);
  }

  async setHeight() {
    setTimeout(()=>{
      const element = document.getElementsByTagName('html');
      const h = document.getElementsByTagName('html')[0].clientHeight;

      const b = (document.getElementsByTagName('header')[0] ? document.getElementsByTagName('header')[0].clientHeight + 9 : 0)
              + (document.getElementsByTagName('footer')[0] ? document.getElementsByTagName('footer')[0].clientHeight + 9 : 0)
              + document.getElementById('topmenu').clientHeight+2
              + 0;
      const mh = h - b
      document.getElementById('main').style.height = `${mh}px`;
    },50);
  }

  onResize(event) {
    this.setHeight();
  }
/*
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }
*/
/*
  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active = 1;
    }
  }
*/
  dbProductoClear(){
    this.dbProducto = [];
  }

  async searchProducto(){
    try {
      const data:any = await this.provprod.leerData(
        `${API_URI}/articulos/test/${this.itemSearchProducto}`
      );
//        console.log(data);
      for (let i = 0; i < data.length; i++) {
        const e = data[i];
        if (this.dbProducto.every( p => p._id !== e._id)) this.dbProducto.push(e);
      }
//        console.log(this.dbProducto);
    } catch (error) {
      console.log(error);
    }
  }

  async toggleCheck3(e,r){
    if (e.target.checked) {
      console.log("Checked", e.target.value)
      console.log("Checked reg", r)
      this.selected.push(r);
    } else {
      const index = this.selected.findIndex(x => x._id === r._id);
      console.log("UnChecked", r)
      this.selected.splice(index,1);
    }
    console.log(this.selected);
  }
  mezclar(){
    const preData = {
      fabricante: [],
      marca: [],
      name: [],
      especie: [],
      edad: [],
      raza: [],
      nombre: [],

    };

    for (let i = 0; i < this.selected.length; i++) {
      const element = this.selected[i];


    }
  }
  async toggleCheck(e,r){
    if (e.target.checked) {
      console.log("Checked", e.target.value)
      console.log("Checked reg", r)
      this.selected.push(r);
      //selected.push(new FormControl(e.target.value));
/*
      _id?: object;
      id_proveedor: object;
      codigo_proveedor: string;
      codigo_ean: string;
      fabricante?: string;
      marca?: string;
      especie?: string;
      edad?: string;
      raza?: string;
      rubro?: string;
      linea?: string;
      name?: string;
      descripcion?: string;
      bulto?: number;
      bname?: string;
      contiene?: number;
      cname?: string;
      unidad?: string;
      precio_lista?: number;
      coef_descuento?: number;
      coef_retenciones?: number;
      precio_final?: number;
      articulo_id?: object;
      producto_id?: object;
*/
      if ( this.stage > 0 ) return;
      //const reg = this.dbProvProd[e.target.value];
      console.log('stage > 0',r);
      const art_keys = [
        'fabricante',
        'marca',
        'especie',
        'edad',
        'raza',
        'rubro',
        'linea',
        'name',
//        'descripcion'
      ];
      const prod_keys = [
        'codigo_ean',
        'bulto',
        'bname',
        'contiene',
        'cname',
        'unidad'
      ];

      const Articulo = {};
      for (let i = 0; i < art_keys.length; i++) {
        const key = art_keys[i];
        if(r[key]){
          Articulo[key] = {'$regex': {flags: 'i', params: r[key] }};
        }
      }
      //const names = reg['nombre'].split(' ');
      this.itemSearchProducto = r['nombre'];
      this.searchProducto();
    } else {
       const index = this.selected.findIndex(x => x._id === r._id);
       console.log("UnChecked", r)
       this.selected.splice(index,1);
    }
    console.log(this.selected);
  }

  async toggleCheck1(e,r){
    if (e.target.checked) {
      console.log("Checked", e.target.value)
      console.log("Checked reg", r)
      this.selected.push(r);
      //selected.push(new FormControl(e.target.value));
/*
      _id?: object;
      id_proveedor: object;
      codigo_proveedor: string;
      codigo_ean: string;
      fabricante?: string;
      marca?: string;
      especie?: string;
      edad?: string;
      raza?: string;
      rubro?: string;
      linea?: string;
      name?: string;
      descripcion?: string;
      bulto?: number;
      bname?: string;
      contiene?: number;
      cname?: string;
      unidad?: string;
      precio_lista?: number;
      coef_descuento?: number;
      coef_retenciones?: number;
      precio_final?: number;
      articulo_id?: object;
      producto_id?: object;
*/
      if ( this.stage > 0 ) return;
      //const reg = this.dbProvProd[e.target.value];
      console.log('stage > 0',r);
      const art_keys = [
        'fabricante',
        'marca',
        'especie',
        'edad',
        'raza',
        'rubro',
        'linea',
        'name',
//        'descripcion'
      ];
      const prod_keys = [
        'codigo_ean',
        'bulto',
        'bname',
        'contiene',
        'cname',
        'unidad'
      ];

      const Articulo = {};
      for (let i = 0; i < art_keys.length; i++) {
        const key = art_keys[i];
        if(r[key]){
          Articulo[key] = {'$regex': {flags: 'i', params: r[key] }};
        }
      }
      //const names = reg['nombre'].split(' ');
      this.itemSearchProducto = r['nombre'];
      this.searchProducto();
    } else {
       const index = this.selected.findIndex(x => x._id === r._id);
       console.log("UnChecked", r)
       this.selected.splice(index,1);
    }
    console.log(this.selected);
  }

  setArticulo(ev){
    //console.log(ev)
    this.stage = 1;
    const e = JSON.parse(JSON.stringify(ev));
    //console.log("Articulo",e);
    const newData = [];
    //console.log(e);
    for (let i = 0; i < this.selected.length; i++) {
      //const idx = this.dbProvProd.findIndex(x => x._id === e._id);
      //console.log("selected",this.selected[i]);
      const idx = this.dbProvProd.findIndex(x => x._id === this.selected[i]._id);
      this.dbProvProd[idx]['articulo_id'] = e._id;
      newData.push(JSON.parse(JSON.stringify(this.dbProvProd[idx])));
    }
    this.selected = [];
    this.dbProducto = [];
    this.itemSearchProdProv = "";
    this.dbProducto.push(e);
    this.dbProvProd = JSON.parse(JSON.stringify(newData)).sort((a,b) =>  b.contiene-a.contiene );
    this.setHeight()
  }

  setProducto(ev){
    const newData = [];
    const newSet = {
      _id: this.dbProducto[0]._id,
      fullName: this.dbProducto[0].fullName,
      prodName: `${ev.name} ${ev.strContiene} ${ev.unidad || ''} ${ev.sname} ${ev.sStrContiene} ${ev.sunidad}`,
      image: this.dbProducto[0].image || ev.image,
      productos: []
    }

    for (let i = 0; i < this.selected.length; i++) {
      const idx = this.dbProvProd.findIndex(x => x._id === this.selected[i]._id);
      this.dbProvProd[idx]['producto_id'] = ev._id;
      this.dbProvProd[idx]['prodName'] = `${ev.name} ${ev.strContiene} ${ev.unidad || ''} ${ev.sname} ${ev.sStrContiene} ${ev.sunidad}`
      newSet['productos'].push(JSON.parse(JSON.stringify(this.dbProvProd[idx])));
    }

    //console.log("New Set");
    //console.log(newSet);
    for (let i = 0; i < newSet['productos'].length; i++) {
      const e = newSet['productos'][i];
      const index = this.dbProvProd.findIndex(x => x.producto_id === e.producto_id);
      if(index >= 0) this.dbProvProd.splice(index,1);
    }

    this.readyData.push(JSON.parse(JSON.stringify(newSet)));

    this.selected = [];
    this.setHeight()
  }

  revertReadyData(idx){
    this.readyData[idx]['producto_id'] = null;
    this.readyData[idx]['prodName'] = null;
    delete this.readyData[idx]['producto_id'];
    delete this.readyData[idx]['prodName'];
    this.dbProvProd.push(JSON.parse(JSON.stringify(this.readyData[idx])))
    this.dbProvProd.sort((a,b) =>  b.contiene-a.contiene );
    this.readyData.splice(idx,1);
  }

  async filtrar() {
    //if(this.itemSearchProdProv.trim().length === 0)  this.tmpList = JSON.parse(JSON.stringify(this.dbProvProd));
    //else this.tmpList = this.dbProvProd.filter( (val) => (val.nombre).trim().toLowerCase().includes(this.itemSearchProdProv));
    console.log(this.filtro)
    const retProvProd:any = await this.artprov.artProvList(this.itemSearchProdProv);
    for (let i = 0; i < retProvProd.length; i++) {
      const element = retProvProd[i];
      if(element.articulo_id) element.class="ready1";
      if(element.producto_id) element.class="ready2";
    }
    this.dbProvProd = retProvProd;
    console.log(this.dbProvProd);
  }

  async filter() {
    console.log(this.filtro);
    const retProvProd:any = await this.artprov.artProvList(this.filtro);
    for (let i = 0; i < retProvProd.length; i++) {
      const element = retProvProd[i];
      if(element.articulo_id) element.class="ready1";
      if(element.producto_id) element.class="ready2";
    }
    this.dbProvProd = retProvProd;
    console.log(this.dbProvProd);
  }

  provProdSearch(){
    console.log(this.itemSearchProdProv);
    this.filtrar();
  }

  async saveReadyData(){
    //console.log("Se graba...");
    for (let i = 0; i < this.readyData.length; i++) {
      const array = this.readyData[i].productos;
      for (let n = 0; n < array.length; n++) {
        const e = array[n];
        const save = {
          _id: e._id,
          articulo_id: e.articulo_id,
          producto_id: e.producto_id
        }
        //console.log(save);
        const rslt = await this.provprod.savelink(save)
        //console.log(rslt);
      }
    }
    //console.log('Fin grabación');
    this.ngOnInit();
  }
}
