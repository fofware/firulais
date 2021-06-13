import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { IArticulo } from 'src/app/models/i-articulo';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { ProductosService } from 'src/app/services/productos.service';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-producto-link',
  templateUrl: './producto-link.component.html',
  styleUrls: ['./producto-link.component.css']
})
export class ProductoLinkComponent implements OnInit {
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
    private provprod: ListasArtProdService
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
    const retProvProd:any = await this.provprod.list();
    for (let i = 0; i < retProvProd.length; i++) {
      const element = retProvProd[i];
      if(element.id_articulo) element.class="ready1";
      if(element.id_producto) element.class="ready2";
    }
    this.dbProvProd = retProvProd;
    console.log(this.dbProducto);
    console.log(this.dbProvProd);
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
  async toggleCheck(e){
    if (e.target.checked) {
//      console.log("Checked", e.target.value)
      this.selected.push(e.target.value);
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
      id_articulo?: object;
      id_producto?: object;
*/
      if ( this.stage > 0 ) return;
      const reg = this.dbProvProd[e.target.value];
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
        if(reg[key]){
          Articulo[key] = {'$regex': {flags: 'i', params: reg[key] }};
        }
      }
      const names = reg['descripcion'].split(' ');
/*
      const o = [];
      for (let i = 0; i < names.length; i++) {
//      for (let i = 0; i < 1; i++) {
        const n = names[i].trim();
        if(n.length > 2) o.push({'name':{'$regex': names[i], '$options': 'i'}});
//        const regex = new RegExp(names[i],'i');
//        o.push(regex);
      }
      console.log(o);
//      Articulo['$and'] = [{'$or': o}];
      console.log(Articulo);
*/
      try {
        const data:any = await this.provprod.readData(
          `${API_URI}/articulos/productos/listdata`,
          {Articulo, Producto: {}, Extra: {}, searchItem: '', Sort: {fullName: 1} }
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
    } else {
       const index = this.selected.findIndex(x => x === e.target.value);
//       console.log("UnChecked", e.target.value)
       this.selected.splice(index,1);
    }
//    console.log(this.selected);
  }
  setArticulo(ev){
    this.stage = 1;
    const e = JSON.parse(JSON.stringify(ev));
    const newData = [];
//    console.log(e);
    for (let i = 0; i < this.selected.length; i++) {
      const idx = this.selected[i];
      this.dbProvProd[idx]['id_articulo'] = e._id;
      newData.push(JSON.parse(JSON.stringify(this.dbProvProd[idx])));
    }
    this.selected = [];
    this.dbProducto = [];
    this.dbProducto.push(e);
    this.dbProvProd = JSON.parse(JSON.stringify(newData)).sort((a,b) =>  b.contiene-a.contiene );
    this.setHeight()
  }
  setProducto(ev){
    const newData = [];
//    console.log(ev)
    for (let i = 0; i < this.selected.length; i++) {
      const idx = this.selected[i];
      this.dbProvProd[idx]['id_producto'] = ev._id;
      this.dbProvProd[idx]['prodName'] = `${ev.name} ${ev.strContiene} ${ev.unidad || ''} ${ev.sname} ${ev.sStrContiene} ${ev.sunidad}`
      this.readyData.push(JSON.parse(JSON.stringify(this.dbProvProd[idx])));
    }
    for (let i = 0; i < this.readyData.length; i++) {
      const e = this.readyData[i];
      const index = this.dbProvProd.findIndex(x => x.id_producto === e.id_producto);
      if(index >= 0) this.dbProvProd.splice(index,1);
    }

    this.selected = [];
    this.setHeight()
  }
  revertReadyData(idx){
    this.readyData[idx]['id_producto'] = null;
    this.readyData[idx]['prodName'] = null;
    delete this.readyData[idx]['id_producto'];
    delete this.readyData[idx]['prodName'];
    this.dbProvProd.push(JSON.parse(JSON.stringify(this.readyData[idx])))
    this.dbProvProd.sort((a,b) =>  b.contiene-a.contiene );
    this.readyData.splice(idx,1);
  }
  async saveReadyData(){
    for (let i = 0; i < this.readyData.length; i++) {
      const e = this.readyData[i];
      const save = {
        _id: e._id,
        id_articulo: e.id_articulo,
        id_producto: e.id_producto
      }
      const rslt = this.provprod.savelink(save)
      console.log(rslt);
    }
    this.ngOnInit();
  }
}
