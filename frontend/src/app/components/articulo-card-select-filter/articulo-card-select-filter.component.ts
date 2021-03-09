import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-articulo-card-select-filter',
  templateUrl: './articulo-card-select-filter.component.html',
  styleUrls: ['./articulo-card-select-filter.component.css']
})
export class ArticuloCardSelectFilterComponent implements OnInit {

  @Input() setting: any;
  @Input() searchItem: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearchArticulos = new EventEmitter<object>();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    console.log('FILTER ONCHANGES');
//    console.log(changes);
  }
  searchArticulos(): void {
    const searchItem = this.searchItem || '';
    console.log('FILTER-EMIT-EVENT');
    this.onSearchArticulos.emit({ setting: this.setting, searchItem });
  }

}
