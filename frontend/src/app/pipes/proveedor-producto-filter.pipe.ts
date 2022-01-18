import { Pipe, PipeTransform } from '@angular/core';
import { ItemComprobante } from '../models/i-comprobante-items';

@Pipe({
  name: 'proveedorProductoFilter'
})
export class ProveedorProductoFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    console.log(list);
    return filterText.length ? list.filter(item => (item.nombre).trim().search(new RegExp(filterText, 'i')) > -1 && item.producto === null) : list;
    //return filterText.length ? list.filter( (item) => (item.nombre).trim().toLowerCase().includes(filterText)  && item.producto_id === null) : list;
  }

}
