import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  borrar(){
    console.log(this.producto)
    this.onBorrar.emit(this.idx);
  }
}
