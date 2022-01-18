import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloLinkProductoComponent } from '../articulo-link-producto/articulo-link-producto.component';

@Component({
  selector: 'app-producto-form-edit',
  templateUrl: './producto-form-edit.component.html',
  styleUrls: ['./producto-form-edit.component.css']
})
export class ProductoFormEditComponent implements OnInit {
  @Input() producto;
  @Input() articulo;
  @Input() unidades;
  @Input() idx = null;
  @Output()  onBorrar = new EventEmitter<number>();
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  borrar(){
    console.log(this.producto)
    this.onBorrar.emit(this.idx);
  }
  productLink(){
    console.log("Link Productos");
    const linkForm = this.modalService.open(ArticuloLinkProductoComponent,{

      //beforeDismiss: () => {
      //  console.log("BeforeDisMiss");
      //  const ret: boolean = linkForm.componentInstance.checkData();
      //  return ret;
      //},
       size: 'xl'
      , scrollable: true
      , centered: false
      , backdrop: true
    });
    linkForm.componentInstance.articulo = this.articulo;
    linkForm.componentInstance.idx = this.idx;
    linkForm.result.then( retData => {
      console.log("Result",retData);
      if(retData){
        if(retData === 'Save'){
          console.log("Grabar")
          //this.selectedArticulo.productos.push(linkForm.componentInstance.producto);
          //this.setProdList();
        }
      }
    }, retData => {
      console.log("dismissed",retData);
    })
  }
}
