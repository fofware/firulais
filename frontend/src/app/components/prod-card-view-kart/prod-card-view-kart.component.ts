import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-card-view-kart',
  templateUrl: './prod-card-view-kart.component.html',
  styleUrls: ['./prod-card-view-kart.component.css']
})
export class ProdCardViewKartComponent implements OnInit {
  @Input() producto: any;
  @Input() showStock: any;
  @Input() cmpTipo: any;
  @Input() idx: number;

  constructor() { }

  ngOnInit(): void {
  }

}
