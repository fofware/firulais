import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-card-view-dos',
  templateUrl: './prod-card-view-dos.component.html',
  styleUrls: ['./prod-card-view-dos.component.css']
})
export class ProdCardViewDosComponent implements OnInit {

  @Input() articulo: any;
  @Input() showStock: any;
  @Input() cmpTipo: any;
  @Input() idx: number;
  constructor() { }

  ngOnInit(): void {
  }
}
