import { Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

const WIKI_URL = 'http://desktop.firulais.net.ar:4400/api/proveedoresarticulos/nombre/';
const PARAMS = new HttpParams({
});

@Injectable()
export class ProvWikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(`${WIKI_URL}${term}`).pipe(
      //.get<[any, string[]]>(`${WIKI_URL}`, {params: PARAMS.set('search', term)}).pipe(
      //.get<[any, string[]]>(WIKI_URL, params ).pipe(
        map(response => {
          console.log(response)
          return response
        })
      );
  }
}

@Component({
  selector: 'app-producto-autocomplete',
  templateUrl: './producto-autocomplete.component.html',
  providers: [ProvWikipediaService],
  styleUrls: ['./producto-autocomplete.component.css']
})


export class ProductoAutocompleteComponent implements OnInit {

  @Output() onSelectItemEvent = new EventEmitter<any>();

  model: any;
  searching = false;
  searchFailed = false;

  @ViewChild('mysearch') mysearch: ElementRef;

  constructor(private _service: ProvWikipediaService) { }

  ngOnInit(): void {
  }

  search: OperatorFunction<string, readonly {nombre, bulto, contiene, proveedor }[]>  = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  /*
  search1: OperatorFunction<string, readonly {name, flag}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  */
    formatter = (x: {nombre: string, bulto: number, contiene: number, proveedor: any}) => `${x.nombre} ${x.bulto || 1} ${x.contiene || 1} ${x.proveedor.apellido} ${x.proveedor.nombre}`;
    formatterin = (x: {nombre: string, bulto: number, contiene: number, proveedor: any}) => null; //`${x.nombre} ${x.bulto || 1} ${x.contiene || 1} ${x.proveedor.apellido} ${x.proveedor.nombre}`;

  selectItem(evt){
    console.log(evt);
    this.onSelectItemEvent.emit( { ev: evt.item } );
  }
}
