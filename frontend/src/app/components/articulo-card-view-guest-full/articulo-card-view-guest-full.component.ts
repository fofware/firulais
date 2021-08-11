import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo-card-view-guest-full',
  templateUrl: './articulo-card-view-guest-full.component.html',
  styleUrls: ['./articulo-card-view-guest-full.component.css']
})

export class ArticuloCardViewGuestFullComponent implements OnInit {

  @Input() articulo: any;

  constructor() { }

  ngOnInit(): void {
  }

}
