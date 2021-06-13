import { Component, Input, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { API_URI } from 'src/app/shared/uris';
import { ProductoFormAddModalComponent } from '../producto-form-add-modal/producto-form-add-modal.component';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {

  @Input() public selectedArticulo;

  compareArticulo = {};
  prodList = [];
  unidades = [];
  user: {}
  newFormula: any = {
    name: '',
    showname: false,
    value: '',
    showvalue: false
  }

  newBeneficios: any = {
    name: '',
    showname: false,
    value: '',
    showvalue: false
  }

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private list: ListasArtProdService
             ) { }

  ngOnInit(): void {
    this.setProdList();
    console.log(this.user)
  }
  setProdList(){
    this.compareArticulo = JSON.parse(JSON.stringify(this.selectedArticulo));
    this.prodList = JSON.parse(JSON.stringify(this.selectedArticulo.productos));
    this.unidades = [{ id: null, name: null }];

    for (let index = 0; index < this.prodList.length; index++) {
      const e = this.prodList[index];
      if(e.count_parte !== 0 && e.count_ins !== 0) // No se muestran los pesables ni las cajas o Packs
      {
//        this.prodList[index].parentname = this.readParent(e.parent);
        const unid = { id: e._id, name: this.readParent(e._id) };
        if (!this.unidades) { this.unidades = [unid]; }
        else { this.unidades.push(unid); }
      }
    }
  }
  readParent(id: any, descr?: string) {
    if ( descr === undefined ) { descr = ''; }
    const item = this.findProduct(id);
    if (item._id) {
      if (`${item._id}` === `${item.parent}` || item.parent === undefined) { item.parent = null; }
      descr += `${item.name} ${item.contiene} ${item.unidad}`;
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

  open() {
    this.modalService.open( NgbdModal2Content, {
      size: '100%'
    });
  }

  addFormula(){
    this.selectedArticulo.formula.push(JSON.parse(JSON.stringify(this.newFormula)));
    this.newFormula = {name: '', value: '', show: false}
  }
  addBeneficios(){
    this.selectedArticulo.beneficios.push(JSON.parse(JSON.stringify(this.newBeneficios)));
    this.newBeneficios = {name: '', value: '', show: false}
  }
  borraBeneficio(idx){
    this.selectedArticulo.beneficios.splice(idx,1)
  }
  borraFormula(idx){
    this.selectedArticulo.formula.splice(idx,1)
  }
  checkData(): boolean {
    let equal = (JSON.stringify(this.selectedArticulo) === JSON.stringify(this.compareArticulo));
    console.log("Compara data1", (JSON.stringify(this.selectedArticulo) === JSON.stringify(this.compareArticulo)))
    console.log(equal);
    if(!equal){
      equal = confirm('Se perderán los cambios si no lo los graba.')
    }
    return equal;
  }

  async saveData(){
    try {
      let retData: any;
      if( this.selectedArticulo._id){
        retData = await this.list.saveData( `${API_URI}/articulos/productos/updatefullData`, this.selectedArticulo);
      } else {
        retData = await this.list.saveData( `${API_URI}/articulos/productos/newfullData`, this.selectedArticulo);
      }
      this.selectedArticulo = retData.rpta;
      console.log(retData);
      this.activeModal.close('Save')
    } catch (error) {
      console.log(error);
    }
  }
  borrarProducto(idx: number) {
    const p = this.prodList[idx];
    console.log("Borrar :", idx, p);
    console.log('--------');
    const dependen = [];
    if (p.parent !== null && !p.pesable) {
      for (let i = 0; i < this.prodList.length; i++) {
        const e = this.prodList[i];
        if (`${e._id}` !== `${p._id}`) {
          if (`${e._id}` === `${p.parent}`) {
            const a = JSON.parse(JSON.stringify(e))
            a.info = `en ${p.name} de ${p.contiene}`
            a.calc_compra = p.compra / p.contiene;
            a.calc_reposicion = p.reposicion / p.contiene;
            a.calc_stock = p.stock * p.contiene;
            dependen.push(a);
          }
        }
      }
    }
    else {
      for (let i = 0; i < this.prodList.length; i++) {
        const e = this.prodList[i];
        if (`${e._id}` !== `${p._id}`) {
          const a = JSON.parse(JSON.stringify(e))
          if (`${e.parent}` === `${p._id}`) {
            if (e.pesable) a.info = 'pesable';
            if (p.pVenta && p.count_cerrado === 0) a.info = `en ${e.name} de ${e.contiene}`;
            //if (p.pCompra )
            dependen.push(a)
          }
        }
      }
    }
    let ok = true;
    if (dependen.length){
      console.log(dependen);
      const consulta = this.modalService.open(NgbdModal2Content);
      consulta.componentInstance.titulo ="asdfasdfasdfasdfaasdfa"
      consulta.componentInstance.contenido ="qwerqewrqwerqwerqwerqwerqr"
      consulta.result.then(ret => {
        console.log(ret)
        if(ret == 'Ok') this.selectedArticulo.productos.splice(idx, 1);
      })
    } else {
      this.selectedArticulo.productos.splice(idx, 1);
    }
  }
  add_producto(){
    const add_form = this.modalService.open(ProductoFormAddModalComponent,{
      beforeDismiss: () => {
        console.log("BeforeDisMiss");
        const ret: boolean = add_form.componentInstance.checkData();
        return ret;
      }
      , size: 'xl'
      , scrollable: true
      , centered: false
      , backdrop: false
    });
    add_form.componentInstance.titulo = "Agrear Producto";
    add_form.componentInstance.contenido = "Contenido";
    add_form.componentInstance.articulo = this.selectedArticulo;
    add_form.componentInstance.unidades = this.unidades;
    add_form.result.then( retData => {
      console.log("Result",retData);
      if(retData){
        if(retData === 'Save'){
          this.selectedArticulo.productos.push(add_form.componentInstance.producto);
          this.setProdList();
        }
      }
    }, retData => {
      console.log("dismissed",retData);
    })
  }
}

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{titulo}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{contenido}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Ok')">Ok</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Cancel')">Cancel</button>
    </div>
  `
})
export class NgbdModal2Content {
  @Input() titulo;
  @Input() contenido;
  constructor(public activeModal: NgbActiveModal) {}

}
