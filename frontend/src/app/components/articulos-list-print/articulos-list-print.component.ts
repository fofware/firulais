import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-articulos-list-print',
  templateUrl: './articulos-list-print.component.html',
  styleUrls: ['./articulos-list-print.component.css']
})
export class ArticulosListPrintComponent implements OnInit {

  articuloList: any;
  id: any;

  constructor(route: ActivatedRoute,
    private printService: PrintService) {
      this.id = route.snapshot.params['ids'];
  }

  ngOnInit(): void {
    this.articuloList = JSON.parse(localStorage.getItem(this.id));
    localStorage.removeItem(this.id);
    Promise.all(this.articuloList)
    .then(() => this.printService.onDataReady());

  }
}
