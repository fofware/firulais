import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personasFilter'
})
export class PersonasFilterPipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  */

  transform(list: any[], filterText: string): any {
    console.log("personaFilter",filterText);
    return list ? list.filter(item => (item.apellido+ ' '+ item.nombre).trim().search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
