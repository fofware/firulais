import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-card-view-list',
  templateUrl: './prod-card-view-list.component.html',
  styleUrls: ['./prod-card-view-list.component.css']
})
export class ProdCardViewListComponent implements OnInit {

  @Input() articulo: any;
  @Input() showStock: any;
  @Input() cmpTipo: any;
  @Input() idx: number;

  constructor() { }

  ngOnInit(): void {
  }

}
