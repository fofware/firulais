import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-product-list-print',
  templateUrl: './product-list-print.component.html',
  styleUrls: ['./product-list-print.component.css']
})
export class ProductListPrintComponent implements OnInit {

  articuloList: any = [];
  id: any;
  constructor(route: ActivatedRoute,
    private printService: PrintService) {
      this.id = route.snapshot.params['ids'];
  }

  ngOnInit(): void {
    const array = JSON.parse(localStorage.getItem(this.id));
    const plus = array.length % 2;
    for (let index = 0; index < array.length-plus; index+=2) {
      const e = array[index];
      const f = array[index+1];
      this.articuloList.push([e,f]);
    }
    if(plus)
      this.articuloList.push([array[array.length-plus]]);

    localStorage.removeItem(this.id);
    Promise.all(this.articuloList)
    .then(() => this.printService.onDataReady());
  }

}
