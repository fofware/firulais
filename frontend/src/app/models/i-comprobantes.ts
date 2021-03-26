import { decimales, round } from '../common/utils';
import { API_URI } from '../shared/uris';

import { ItemComprobante } from './i-comprobante-items';
import { IPersonas } from './i-personas';

// export interface IComprobantes {}

export class Comprobante {
  data: {
    fecha: string;
    hora: number;
    persona: IPersonas;
    tipo: string; // de_compra / de_venta
    operacion: string; // contado, cta-cte, credito, suscripción?
    pagoTipo: number;
    ca_pago: any;
    listaTipo: number;
    ca_lista: any;
    sucursal: number;
    numero: number;
    cae: string;
    items: ItemComprobante[];
    sumaAjustes: number;
    sumaCompra: number;
    sumaReposicion: number;
    sumaNeto: number;   // subTotal sin ivas
    ivas: [];
    sumaIva: number;
    sumaBruto: number;  // subTotal con ivas
    retenciones: [];
    percepsiones: [];
    sumaRetenciones: number;
    sumaPercepciones: number;
    sumaTotal: number;
    bultos: number;
  } = {
      fecha: '',
      hora: 0,
      persona: { name: 'Persona', coeficiente: 1 },
      tipo: '', // de_compra / de_venta
      operacion: '', // contado, cta-cte, credito, suscripción?
      pagoTipo: 2,
      ca_pago: { name: 'Débito', value: 1 },
      listaTipo: 2,
      ca_lista: { name: 'Cliente', basePrecio: 'precio', value: 1 },
      sucursal: 0,
      numero: 0,
      cae: '',
      items: [],
      sumaAjustes: 0,
      sumaCompra: 0,
      sumaReposicion: 0,
      sumaNeto: 0,   // subTotal sin ivas
      ivas: [],
      sumaIva: 0,
      sumaBruto: 0,  // subTotal con ivas
      retenciones: [],
      percepsiones: [],
      sumaRetenciones: 0,
      sumaPercepciones: 0,
      sumaTotal: 0,
      bultos: 0
    };
  sumaPagos = 0;
  sumaCobro = 0;
  saldo = 0;
  pagos: any = [];

  ApiUri = API_URI;

  constructor() {
  }
  setTipo(tipo: string): void {
    this.data.tipo = tipo.toLowerCase();
    this.storageRead();
    this.calcula();
  }
  init(): void{
    this.data = {
      fecha: '',
      hora: 0,
      persona: { name: 'Persona', coeficiente: 1 },
      tipo: '', // de_compra / de_venta
      operacion: '', // contado, cta-cte, credito, suscripción?
      pagoTipo: 2,
      ca_pago: { name: 'Débito', value: 1 },
      listaTipo: 2,
      ca_lista: { name: 'Cliente', basePrecio: 'precio', value: 1 },
      sucursal: 0,
      numero: 0,
      cae: '',
      items: [],
      sumaAjustes: 0,
      sumaCompra: 0,
      sumaReposicion: 0,
      sumaNeto: 0,   // subTotal sin ivas
      ivas: [],
      sumaIva: 0,
      sumaBruto: 0,  // subTotal con ivas
      retenciones: [],
      percepsiones: [],
      sumaRetenciones: 0,
      sumaPercepciones: 0,
      sumaTotal: 0,
      bultos: 0
    };
    this.sumaPagos = 0;
    this.sumaCobro = 0;
    this.saldo = 0;
    this.pagos = [];
  }
  storageRead(): any {
    let data: any = localStorage.getItem(`comprobante_${this.data.tipo}`);
    if (data !== null){
      this.data = JSON.parse( data );
      const array = JSON.parse(JSON.stringify(this.data.items));
      this.data.items = [];
      for (let i = 0; i < array.length; i++) {
        const e = array[i].data;
        console.log(e);
        this.add(e.producto);
        const item = this.data.items[i];
        for (const key in array[i]){
          if (Object.prototype.hasOwnProperty.call(array[i], key)) {
            item[key] = array[i][key];
          }
        }
        for (const key in e) {
          if (Object.prototype.hasOwnProperty.call(e, key)) {
            const element = e[key];
            item[key] = element;
          }
        }
/*
        item.setAjusteCliente(this.data.persona.coeficiente);
        item.ajuste_persona();
        item.setAjustePago(this.data.ca_pago);
        item.ajuste_pago();
        item.calculaTotales();
      */
      }
    }
    else{
      data = {
        fecha: '',
        hora: 0,
        persona: { name: 'Persona', coeficiente: 1 },
        tipo: '', // de_compra / de_venta
        operacion: '', // contado, cta-cte, credito, suscripción?
        pagoTipo: 2,
        ca_pago: { name: 'Débito', value: 1 },
        listaTipo: 2,
        ca_lista: { name: 'Cliente', basePrecio: 'precio', value: 1 },
        sucursal: 0,
        numero: 0,
        cae: '',
        items: [],
        sumaAjustes: 0,
        sumaNeto: 0,   // subTotal sin ivas
        ivas: [],
        sumaIva: 0,
        sumaBruto: 0,  // subTotal con ivas
        retenciones: [],
        percepsiones: [],
        sumaRetenciones: 0,
        sumaPercepciones: 0,
        sumaTotal: 0,
        bultos: 0
      };
      this.sumaPagos = 0;
      this.sumaCobro = 0;
      this.saldo = 0;
      this.pagos = [];
    }
    this.calcula();
    return this.data;
  }

  add(producto: any): void {
    if (this.find(producto) === false) {
      const newItem = new ItemComprobante(producto);
      newItem.setAjusteCliente(this.data.persona.coeficiente);
      newItem.setAjustePago(this.data.ca_pago);
      newItem.calcula();
      if (newItem.data.producto.pesable) {
        newItem.valores.importe = newItem.data.rPrecio;
        newItem.data.cantidad = 1;
        newItem.calcula();
      }
      this.data.items.push(newItem);
    }
    this.calcula();
  }
  deleteItem(idx): void {
    this.data.items.splice(idx, 1);
  }
  find(producto): boolean {
    if (producto.pesable === true) { return false; }
    const array = this.data.items;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const el: ItemComprobante = array[i];
      if (el.data.productoId === producto._id) {
        el.data.cantidad++;
        el.calcula();
        return true;
      }
    }
    return false;
  }
  calcula(): void {
    const array = this.data.items;
    this.data.sumaNeto = 0;
    this.data.sumaBruto = 0;
    this.data.sumaIva = 0;
    this.data.sumaPercepciones = 0;
    this.data.sumaRetenciones = 0;
    this.data.sumaTotal = 0;
    this.data.sumaCompra = 0;
    this.data.sumaReposicion = 0;
    this.data.bultos = 0;
    this.data.sumaAjustes = 0;
    this.pagos.sumaCobro = 0;
    this.saldo = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const el: any = array[i];
      this.data.sumaNeto += round(el.data.sumaNeto, decimales);
      this.data.sumaIva += round(el.data.sumaIva, decimales);
      this.data.sumaBruto += round(el.data.sumaBruto, decimales);
      this.data.sumaCompra += round(el.data.sumaCompra, decimales);
      this.data.sumaReposicion += round(el.data.sumaReposicion, decimales);
      this.data.sumaPercepciones += round(el.data.sumaPercepciones, decimales);
      this.data.sumaRetenciones += round(el.data.sumaRetenciones, decimales);
      this.data.sumaAjustes += round(el.data.sumaAjuste, decimales);
      if (el.data.producto.pesable === true) { this.data.bultos++; }
      else { this.data.bultos += el.data.cantidad; }
    }
    this.data.sumaTotal = round(this.data.sumaBruto
      + this.data.sumaRetenciones
      + this.data.sumaPercepciones, decimales);
    this.sumaCobro = round(this.data.sumaTotal, 0);
    this.storageUpdate();
  }
  storageUpdate(): void {
    localStorage.setItem(`comprobante_${this.data.tipo}`, JSON.stringify(this.data));
  }
  storageDelete(): void {
    localStorage.removeItem(`comprobante_${this.data.tipo}`);
  }
  setPago(): void {
    const array = this.data.items;
/*
    for (const el of array) {
      const precio = el.data.rPrecio;
      el.setAjustePago(this.data.ca_pago);
      el.ajuste_pago();
      if (el.data.producto.pesable === true) {
        el.valores.importe = round((el.data.rPrecio * el.data.cantidad), decimales);
      }
      el.calculaTotales();
    }
*/
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const el: ItemComprobante = array[i];
      const precio = el.data.rPrecio;
      el.setAjustePago(this.data.ca_pago);
      el.ajuste_pago();
      if (el.data.producto.pesable === true) {
        el.valores.importe = round((el.data.rPrecio * el.data.cantidad), decimales);
      }
      el.calculaTotales();
    }
    this.calcula();
  }
  setLista(): void {
    const array = this.data.items;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const el: ItemComprobante = array[i];
      const precio = el.data.rPrecio;
      el.setAjusteLista(this.data.ca_lista);
      el.ajuste_pago();
      if (el.data.producto.pesable === true) {
        el.valores.importe = round((el.data.rPrecio * el.data.cantidad), decimales);
      }
      el.calculaTotales();
    }
    this.calcula();
  }
  setClient(): void {
    const array = this.data.items;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const el: ItemComprobante = array[i];
      const precio = el.data.rPrecio;
      el.setAjusteCliente(this.data.persona.coeficiente);
      el.ajuste_persona();
      if (el.data.producto.pesable === true) {
        el.valores.importe = round((el.data.rPrecio * el.data.cantidad), decimales);
      }
      el.calculaTotales();
    }
    this.calcula();
  }
  sumarPagos(): void {
    const array = this.pagos;
    this.saldo = this.sumaCobro;
    this.sumaPagos = 0;
//    const i = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      array[i].saldo = this.saldo;
      const valor = parseFloat(array[i].value);
      this.saldo -= valor;
      this.sumaPagos += this.saldo >= 0 ? valor : valor + this.saldo;
      array[i].vuelto = this.saldo < 0 ? this.saldo * -1 : 0;
    }
  }
  addPago(pago): void {
    this.pagos.push(pago);
    this.sumarPagos();
    console.log(this.pagos);
  }
  deletePago(idx): void {
    console.log(this.pagos);
    console.log(idx, this.pagos[idx]);
    this.pagos.splice(idx, 1);
  }
  isAccount(): boolean {
    if (this.data.persona._id) { return true; }
    return false;
  }
}
