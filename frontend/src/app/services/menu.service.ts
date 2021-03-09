import { Injectable } from '@angular/core';
import { menudata } from '../shared/menudata';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    constructor() {}
    get( id: any): any {
      for (let i = 0; i < menudata.length; i++) {
        const m = menudata[i];
        if ( m.id == id ){
          return m.data;
        }
      }
      return { title: id, comment: 'Comuniquese con el Administrador del sistema, esta opcion no existe' };
    }
}
