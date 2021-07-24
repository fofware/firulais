import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productoFilter'
})
export class ProductoFilterPipe implements PipeTransform {
  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
  */
  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => (item.fullName || 'noFullName').trim().search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
