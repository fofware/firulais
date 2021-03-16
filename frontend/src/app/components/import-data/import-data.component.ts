import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Comprobante } from 'src/app/models/i-comprobantes';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ComprobantesService } from 'src/app/services/comprobantes.service';
import { PersonasService } from 'src/app/services/personas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})

export class ImportDataComponent implements OnInit, OnChanges {

  data: any[];

  constructor(private articulos: ArticulosService,
              private productos: ProductosService,
              private personas: PersonasService,
              private comprobantes: ComprobantesService,
              private users: UsersService
              ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    console.log(changes);
  }

  async gotData(event): Promise<void> {
  //  console.log(event);
    try {
      this.data = JSON.parse(event.data);
    } catch (error) {
/*
      const reg = /\n/;
      this.data = [];
      let c = event.data.search(reg);
      do {
        const strline = event.data.substr( 0, c );
        const obj = JSON.parse( strline );
        this.data.push(obj);
        event.data = data.substr(c + 1);
        c = event.data.search(reg);
      } while (c > 0);
*/
      event.data = event.data.replace(/\n/g, ',').substring(0, event.data.length - 1 );
      this.data = JSON.parse( '[' + event.data + ']' );
    }

    this.data = this.saniAll(this.data);
  //  console.log(event.file.name);
    console.log(this.data);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data.length; i++) {
      const e = this.data[i];
//      const rpta = await this.productos.add(e);
      const rpta = await this[event.file.name].import(e);
//      console.log(rpta);
    }
  }

  saniAll(object: any): any {
    if (typeof (object) === 'object') {
      if (Array.isArray(object)) {
        object = this.saniArray(object);
      } else {
        object = this.saniObject(object);
      }
    } else {
      console.log('saniAll-No Object', object);
    }
    return object;
  }

  saniArray(array): void {
    for (let index = 0; index < array.length; index++) {
      array[index] = this.saniAll(array[index]);
    }
    return array;
  }

  saniObject(element): any {
    for (const key in element) {
      if (Object.prototype.hasOwnProperty.call(element, key)) {
        if ( typeof(element[key]) === 'object'){
          element[key] = this.saniAll(element[key]);
        } else {
          if (key.substr(0, 1) === '$') {
            element = element[key];
          }
        }
      } else {
        console.log('saniObject object-NoCall', key, element);
      }
    }
    return element;
  }
}
