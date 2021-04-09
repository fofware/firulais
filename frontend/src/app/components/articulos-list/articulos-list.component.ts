import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/shared/uris';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';

@Component({
  selector: 'app-articulos-list',
  templateUrl: './articulos-list.component.html',
  styleUrls: ['./articulos-list.component.css']
})
export class ArticulosListComponent implements OnInit {
  wait: boolean = false;
  filter = {
/*
    perro: { value: 'perro', display: true, qry: {}}
  , gato: { value: 'gato', display: true, qry: {}}
  , ave: { value: 'ave', display: true, qry: {}}
  , pez: { value: 'pez', display: false, qry: {}}
  , caballo: { value: 'caballo', display: false, qry: {}}
  ,
*/
    pesable: { value: false,  display: false, qry: true }
  , precio: { value: true, display: false,  qry: { $gt: 0 }}
  , stock:  { value: true, display: false,  qry: { $gte: 1 }}
  , servicio: { value: false, display: false, qry: {$eq: true} }
  , pCompra: { value: false, display: false, qry: { $eq: true }}
  , pVenta: { value: true, display: false, qry: { $eq: true }}
  , private_web: { value: true, display: true, qry: { $not: { $eq: true } } }
  };
  articuloOrder = [
    {
      name: 'Descripción',
      vista: 1,
      sort: { fullName: 1, name: 1, contiene: 1  }
    },
    {
      name: 'Rubro/Linea',
      vista: 1,
      sort: { rubro: 1, Linea: 1, marca: 1, especie: 1, fullName: 1 }
    },
    {
      name: 'fabricante',
      vista: 1,
      sort: { fabricante: 1, marca: 1, especie: 1, rubro: 1, linea: 1, fullName: 1 }
    },
    {
      name: 'marca',
      vista: 1,
      sort: { marca: 1, rubro: 1, linea: 1, especie: 1, edad: -1, fullName: 1 }
    },
    {
      name: 'especie',
      vista: 1,
      sort: { especie: 1, edad: -1, rubro: 1, linea: 1, fullName: 1 }
    },
/*
    {
      icon: '<i class="fas fa-search-dollar"></i>',
      name: 'precio',
      vista: 1,
      sort: { precio: 1 }
    },
    {
      icon: '<i class="fas fa-search-dollar"></i>',
      name: 'Precio/Un',
      vista: 1,
      sort: { precioref: 1 }
    }
  */
  ];
  listaOrden = 0;
  showArticulos = true;
  publico = true;
  searchItem: string = '';
  cmpSetting = {
    tipo: 'Venta',
    public: true
  };
  articuloList: any[] = [];
  prodList: any[] = [];
  unidades: [{ id: any, name: string }];
  selectedArticulo: any;

  closeModal: string;

  constructor(  private http: HttpClient,
                private modalService: NgbModal,
                private list: ListasArtProdService
              ) {
                  this.list.filter = this.filter;
                }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true, centered: true }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
      console.log(this.closeModal)
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      console.log(this.closeModal)
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('by pressing ESC')
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('by clicking on a backdrop')
      return 'by clicking on a backdrop';
    } else {
      console.log(`with: ${reason}`)
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.listArticulos()
  }

  filterEvent(ev){
    //  console.log( event );
    //  tslint:disable-next-line:forin
    for (const propName in ev) {
      console.log(propName, ev[propName]);
      this[propName] = ev[propName];
    }
    //  this.searchItem = event.searchItem;
    //  this.filter = event.filter;
    this.searchArticulos();
  }
  listArticulos(): void {
    this.searchItem = ([] as any);
    this.searchArticulos();
  }
  newReg(ev){
    console.log("Add New Articulo")
  }

  searchArticulos(): void {
    if (this.wait) { return; }
    this.wait = true;
    const Articulo: any = {};
    const Producto: any = {};
    const Extra: any = {};

//    if (this.filter.pesable.value) { Extra.pesable = this.filter.pesable.qry; }
    if (this.filter.private_web.value) { Articulo.private_web = this.filter.private_web.qry; }
//    if (this.filter.precio.value) { Extra.precio = this.filter.precio.qry; }
//    if (this.filter.stock.value) { Extra.stock = this.filter.stock.qry; }
//    if (this.filter.servicio.value) { Producto.servicio = this.filter.servicio.qry; }
//    if (this.filter.pCompra.value) { Producto.pCompra = this.filter.pCompra.qry; }
//    if (this.filter.pVenta.value) { Producto.pVenta = this.filter.pVenta.qry; }
    //  console.log( 'LISTAORDEN' , this.articuloOrder[this.listaOrden].sort );
    const Sort = this.articuloOrder[this.listaOrden].sort;

//    this.list.buscaArticulos({Articulo, Producto, Extra, searchItem: this.searchItem, Sort })
    this.list.readData(
      `${API_URI}/articulos/productos/list`,
      {Articulo, Producto, Extra, searchItem: this.searchItem, Sort }
    ).subscribe(
      res => {
        //        this.calculaPrecios(res);
        const data = res as any;
        // tslint:disable-next-line:no-string-literal
        if ( data.length === 1 && Articulo['$and'] && Articulo['$and'].length === 1
        && ( this.searchItem === data[0].codigo || this.searchItem === data[0].plu ))
        {
//          this.onHeaderArticuloSelect.emit(data[0]);
          this.searchItem = '';
          this.wait = false;
          this.searchArticulos();
        } else {
          this.articuloList = data;
        }
        this.wait = false;
        console.log(this.articuloList);
      },
      err => {
        console.log(err);
        this.wait = true;
      }
    );
  }

  SelectEvent(ev,modalData){
    console.log(ev);
    this.selectedArticulo = ev.articulo;
    this.selectedArticulo.idx = ev.idx;
    this.prodList = ev.articulo.productos;
    this.unidades = [{ id: null, name: null }];

    for (let index = 0; index < this.prodList.length; index++) {
      const e = this.prodList[index];
      this.prodList[index].parentname = this.readParent(e.parent);
      const unid = { id: e._id, name: this.readParent(e._id) };
      this.prodList[index].infile = true;
      this.prodList[index].changed = false;
      if (!this.unidades) { this.unidades = [unid]; }
      else { this.unidades.push(unid); }
    }
    this.triggerModal(modalData);
  }

  readParent(id: any, descr?: string) {
    if ( descr === undefined ) { descr = ''; }
    const item = this.findProduct(id);
    if (item._id) {
      if (`${item._id}` === `${item.parent}` || item.parent === undefined) { item.parent = null; }
      descr += `${item.name} ${item.contiene} ${item.unidad}`;
/*
      if (item.contiene && item.contiene > 1) { descr += `${item.name} ${item.contiene} ${item.unidad}`; }
      else if (item.unidad) { descr += `${item.name} ${item.unidad}`; }
      else { descr += `${item.name}`; }
*/
      if (item.parent != null) {
        descr = this.readParent(item.parent, descr);
      }
    }
    return descr.trim();
  }

  findProduct(id: any): any {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.prodList.length; index++) {
      const element: any = this.prodList[index];
      if (element._id === id) { return element; }
    }
    return {};
  }

}
