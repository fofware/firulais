import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjectID } from 'bson';
import { IProducto } from 'src/app/models/i-producto';

@Component({
  selector: 'app-producto-form-add-modal',
  templateUrl: './producto-form-add-modal.component.html',
  styleUrls: ['./producto-form-add-modal.component.css']
})
export class ProductoFormAddModalComponent implements OnInit {
  @Input() titulo;
  @Input() contenido;
  @Input() articulo;
  @Input() unidades;
  producto: IProducto;
  constructor(public activeModal: NgbActiveModal
              ) { }

  ngOnInit(): void {
    console.log(this.articulo);
    this.producto = {
      _id: new ObjectID()
      ,articulo: this.articulo._id
      ,parent: null
      ,name: ''
      ,contiene: null
      ,unidad: null
      ,precio: null
      ,compra: null
      ,reposicion: null
      ,servicio: false
      ,pesable: false
      ,pVenta: false
      ,pCompra: false
      ,codigo: null
      ,plu: null
      ,image: null
      ,parentname: null
      ,changed: null
      ,infile: null
      ,stock: null
      ,stockMin: null
      ,margen: null
      ,iva: null
    }
  }

  checkData(): boolean {
    console.log('Before Dismiss');
    return true;
  }

  save(){
    console.log('Save');
    this.activeModal.close('Save');
  }
}
