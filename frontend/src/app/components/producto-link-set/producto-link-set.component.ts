import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-link-set',
  templateUrl: './producto-link-set.component.html',
  styleUrls: ['./producto-link-set.component.css']
})
export class ProductoLinkSetComponent implements OnInit {
  @Input() setToSave: any;

  constructor() { }

  ngOnInit(): void {
    console.log("Set To Save");
    console.log(this.setToSave);
  }

}
