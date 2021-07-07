import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-producto-card-select-peso',
  templateUrl: './producto-card-select-peso.component.html',
  styleUrls: ['./producto-card-select-peso.component.css']
})
export class ProductoCardSelectPesoComponent implements OnInit {

  @Output() onContieneMsg = new EventEmitter<object>();

  cmp: { op: string, value: number } = {op: '$gte', value: 0 };

  constructor() { }

  ngOnInit(): void {
  }

  cambioCmp(){
    console.log(this.cmp);
    const contiene = {}
    contiene[this.cmp.op] = Number(this.cmp.value);
    this.onContieneMsg.emit( contiene );
  }

}
