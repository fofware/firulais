import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListasToPrintService {

  private key: string;
  public data: {selected: any, lista: {}};
  constructor() { };

  load(key): any | any[] {
    this.key = key;
    this.data = JSON.parse(localStorage.getItem(this.key))
    return this.data;
  }

  setunset( art ){
    console.log( art );
    if(this.data === null || !this.data.selected){
      this.data = {selected: Date.now().toString(), lista: {}};
      this.data.lista[this.data.selected] = [art];
    } else {
      const idx = this.data.lista[this.data.selected].findIndex( item => item._id === art._id);
      if( idx === -1 )
        this.data.lista[this.data.selected].push(art);
      else
        this.data.lista[this.data.selected].splice(idx, 1);
    }
    localStorage.setItem(this.key, JSON.stringify(this.data))
  }

}
