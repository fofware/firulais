import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-browse-ctrl',
  templateUrl: './browse-ctrl.component.html',
  styleUrls: ['./browse-ctrl.component.css']
})
export class BrowseCtrlComponent implements OnInit, OnChanges {

  @Input() tools;
  @Input() page;
  @Input() collectionSize;
  @Input() pageSize;

  @Output() onBrowseCtrlEvent = new EventEmitter<any>();

  searchItem = "";

  constructor() { }

  ngOnInit(): void {
    const puto = document.getElementsByTagName('ul');
    puto[2].style.marginBottom = "0";
    puto[2].style.height = "38px";
    puto[2].style.backgroundColor = "#ffffff"
    console.log(puto);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  event(evt){
    this.onBrowseCtrlEvent.emit( { ev: evt } );
  }

  selectPage(page: string) {
    console.log("selectPage")
    const npage = parseInt(page, 10) || 1;
    if(this.page !== npage){
      this.page = npage;
      this.onPageChange(this.page)
    }
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    console.log("formatInput");
//    this.onPageChange(input.value)
  }

  search(){
    console.log(this.searchItem)
    this.onBrowseCtrlEvent.emit({ev: 'search', searchItem: this.searchItem })

  }
  onPageChange(page){
    console.log(page)
    this.onBrowseCtrlEvent.emit( { ev: 'pageChange', page } );

  }
}
