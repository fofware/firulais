import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-articulo-card-select-tools',
  templateUrl: './articulo-card-select-tools.component.html',
  styleUrls: ['./articulo-card-select-tools.component.css']
})
export class ArticuloCardSelectToolsComponent implements OnInit {

  @Output() onNewRegEvent = new EventEmitter<any>();

  tool = {
    new: { display: true }
  }

  constructor() { }

  ngOnInit(): void {
  }

  addNew(){
    console.log("Emit newRegistro Event");
    this.onNewRegEvent.emit( { ev: 'newReg' } );
  }
}
