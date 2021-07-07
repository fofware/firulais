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
  @Input() filterButtons: any;
  @Input() searchItem: string;
  @Output() onSearchArticulos = new EventEmitter<object>();
  @Output() onButtonMsg = new EventEmitter<object>();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
//    console.log('FILTER ONCHANGES');
//    console.log(changes);
  }
  searchArticulos(): void {
    const searchItem = this.searchItem || '';
//    console.log('FILTER-EMIT-EVENT');
    this.onSearchArticulos.emit({ setting: this.setting, searchItem });
  }
  emitMsg(button){
    console.log(button);
    this.onButtonMsg.emit(this.filterButtons);
  }
  radioItem( parent:any, item:any ){
    const array = parent.buttons;
    item.value = (item.value === item.show.length-1 ? 0 : item.value + 1);
    console.log(this.filterButtons);
    console.log(parent);
    console.log(item);
    if(item.value > 0){
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(item.id !== element.id) element.value = 0;

      }

    }
    this.emitMsg(this.filterButtons);
  }
}
