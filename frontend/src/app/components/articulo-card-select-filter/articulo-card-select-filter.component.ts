import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URI } from 'src/app/shared/uris';

@Component({
  selector: 'app-articulo-card-select-filter',
  templateUrl: './articulo-card-select-filter.component.html',
  styleUrls: ['./articulo-card-select-filter.component.css']
})
export class ArticuloCardSelectFilterComponent implements OnInit, OnChanges{

  @Input() setting: any;
  @Input() filterButtons: any;
//  @Input() searchItem: string;
  @Input() wait: boolean;
  @Output() onSearchArticulos = new EventEmitter<object>();
  @Output() onButtonMsg = new EventEmitter<object>();

  prevSearchItem = "";
  searchItem = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    console.log('FILTER ONCHANGES');
    if(changes.wait)
      if(changes.wait.previousValue === true && changes.wait.currentValue === false) this.searchArticulos();
      console.log(changes.wait);

  }
  searchArticulos(): void {
    if(this.searchItem.length < 3 && this.prevSearchItem.length === 0) return
    if(this.searchItem === this.prevSearchItem) return;
    if(this.wait) return
//    if(this.searchItem.length === 0 && this.prevSearchItem.length > 0)
    this.prevSearchItem = this.searchItem;
    const searchItem = this.prevSearchItem || '';
    //    console.log('FILTER-EMIT-EVENT');
    //this.onSearchArticulos.emit({ setting: this.setting, searchItem });
    //

    this.onSearchArticulos.emit({ searchItem });

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
