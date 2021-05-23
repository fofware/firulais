import { Component, Input, OnInit } from '@angular/core';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { IPersonas } from 'src/app/models/i-personas';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-personas-autocomplete',
  templateUrl: './personas-autocomplete.component.html',
  styleUrls: ['./personas-autocomplete.component.css'],
  //providers: [NgbTypeaheadConfig]
})
export class PersonasAutocompleteComponent implements OnInit {

  @Input() dbList: { fullName:string }[];
  @Input() model: any;

  search: OperatorFunction<string, readonly {fullName}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.dbList.filter(v => v.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {fullName: string}) => x.fullName;

  constructor(
    config: NgbTypeaheadConfig,
    private personas: PersonasService
  ) {
//    config.showHint = true
   }

  async ngOnInit() {
  }

}
