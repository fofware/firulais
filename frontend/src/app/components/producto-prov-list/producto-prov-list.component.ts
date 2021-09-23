import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-prov-list',
  templateUrl: './producto-prov-list.component.html',
  styleUrls: ['./producto-prov-list.component.css']
})
export class ProductoProvListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  setItem(ev){
    console.log(ev);
  }
}
