import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(WIKI_URL, {params: PARAMS.set('search', term)}).pipe(
        map(response => response[1])
      );
  }
}

@Component({
  selector: 'app-producto-autocomplete',
  templateUrl: './producto-autocomplete.component.html',
  providers: [WikipediaService],
  styleUrls: ['./producto-autocomplete.component.css']
})


export class ProductoAutocompleteComponent implements OnInit {
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: WikipediaService) { }

  ngOnInit(): void {
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
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
}
