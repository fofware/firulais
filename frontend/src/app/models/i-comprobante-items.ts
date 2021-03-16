import { round, decimales } from '../common/utils';

// export interface IComprobanteItems {}

export class ItemComprobante {
  data: {
    articuloId: string;
    productoId: string;
    barcode: string;
    cantidad: number;
    precio: number;
    compra: number;
    reposicion: number;
    descuento: number;
    a_persona: number;
    a_pago: number;
    rPrecio: number;
    sumaPrecio: number;
    sumaCompra: number;
    sumaReposicion: number;
    sumaAjuste: number;
    sumaNeto: number;     // subTotal sin iva
    sumaBruto: number;    // subTotal con iva
    iva: [];
    sumaIva: number;
    percepciones: [];
    sumaPercepciones: number;
    retenciones: [];
    sumaRetenciones: number;
    sumaTotal: number;
    producto: any;
  } = {
    articuloId: '',
    productoId: '',
    barcode: '',
    cantidad: 0,
    precio: 0,
    compra: 0,
    reposicion: 0,
    descuento: 0,
    a_persona: 0,
    a_pago: 0,
    rPrecio: 0,
    sumaPrecio: 0,
    sumaCompra: 0,
    sumaReposicion: 0,
    sumaAjuste: 0,
    sumaNeto: 0,     // subTotal sin iva
    sumaBruto: 0,    // subTotal con iva
    iva: [],
    sumaIva: 0,
    percepciones: [],
    sumaPercepciones: 0,
    retenciones: [],
    sumaRetenciones: 0,
    sumaTotal: 0,
    producto: {},
  };
  valores: {
    importe: number;
    cPago: number;
    cCliente: number;
    totalA_pago: number;
    totalA_persona: number;
  } = {importe: 0, cPago: 1, cCliente: 1, totalA_pago: 0, totalA_persona: 0};

constructor(producto: any ){
    this.data.articuloId = producto.articulo;
    this.data.productoId = producto._id;
    this.data.barcode = producto.codigo;
    this.data.cantidad = 1;
    this.data.precio = producto.precio;
    this.data.compra = producto.compra;
    this.data.reposicion = producto.reposicion;
    this.data.sumaPrecio = producto.precio;
    this.data.sumaCompra = producto.compra;
    this.data.sumaReposicion = producto.reposicion;
    this.data.descuento = 0;
    this.data.a_persona = 0;
    this.data.a_pago = 0;
    this.data.rPrecio = 0;
    this.data.sumaNeto = this.data.precio * this.data.cantidad;
    this.data.iva = producto.iva || [];
    this.data.percepciones = producto.percepciones || [];
    this.data.retenciones = producto.retenciones || [];
    this.data.sumaBruto = 0;
    this.data.producto = producto;
  }
  setIva(iva: []): void {
    this.data.iva = iva;
    this.calcula();
  }
  setPercepciones(percepciones: []): void {
    this.data.percepciones = percepciones;
    this.calcula();
  }
  setRetenciones(retenciones: []): void {
    this.data.retenciones = retenciones;
    this.calcula();
  }
  calculaImpuestosNeto(value, array): void {
    value = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      if (el.subTotal === 'sumaNeto'){
        el.valor += this[el.subtotal] * el.percent / 100;
        value += el.valor;
      }
    }
  }
  calculaImpuestosBruto( value, array ): void {
    value = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      if (el.subTotal === 'sumaBruto'){
        el.valor += this[el.subtotal] * el.percent / 100;
        value += el.valor;
      }
    }
  }
  ajuste_persona(): void {
    this.data.a_persona = round((this.data.precio * this.valores.cCliente) - this.data.precio, decimales);
    this.ajuste_pago();
  }
  ajuste_pago(): void {
    const subtoPersona = this.data.precio + this.data.a_persona;
    this.data.a_pago = round((subtoPersona * this.valores.cPago) - subtoPersona, decimales);
    this.calcula_precio();
  }
  calcula_precio(): void {
    this.data.rPrecio = round(this.data.precio + this.data.a_persona + this.data.a_pago, decimales);
    this.data.sumaPrecio = round(this.data.rPrecio * this.data.cantidad, decimales);
  }
  calcula_cantidad(): void {
    if ( this.data.producto.pesable ) {
      this.data.cantidad = round((this.valores.importe / this.data.rPrecio), 3 );
    }
    this.data.sumaPrecio = round(this.data.rPrecio * this.data.cantidad, decimales);
    this.calculaTotales();
  }
  calcula(): void {
    this.ajuste_persona();
    this.calcula_cantidad();
  }
  calculaTotales(): void {
    this.data.sumaPrecio = round(this.data.rPrecio  * this.data.cantidad, decimales);
    this.data.sumaAjuste = round(((this.data.a_pago + this.data.a_persona) * this.data.cantidad) + this.data.descuento, decimales);
    this.valores.totalA_pago = round(this.data.a_pago * this.data.cantidad, decimales);
    this.valores.totalA_persona = round(this.data.a_persona * this.data.cantidad, decimales);

    this.data.sumaNeto = round(this.data.sumaPrecio + this.data.descuento, decimales);

    this.calculaImpuestosNeto(this.data.sumaIva, this.data.iva);
    this.data.sumaBruto = (this.data.sumaNeto + this.data.sumaIva);
    this.calculaImpuestosBruto(this.data.sumaIva, this.data.iva);
    this.data.sumaTotal = round((this.data.sumaBruto
                    + this.data.sumaPercepciones
                    + this.data.sumaRetenciones), decimales);
  }
  setAjustePago( ca_pago ): void {
    this.valores.cPago = ca_pago.value;
  }
  setAjusteLista( ca_lista ): void {
    if (ca_lista.margen){
//      console.log("margen",this.data.producto);
//      console.log(((100+this.data.producto.margen)/100), ca_lista)
      // tslint:disable-next-line:max-line-length
      this.data.precio = round(( this.data.producto[ca_lista.basePrecio] * ((100 + this.data.producto.margen) / 100)) * ca_lista.value , decimales);
    } else {
      this.data.precio = this.data.producto[ca_lista.basePrecio] * ca_lista.value;
    }
  }
  setAjusteCliente(value): void {
    this.valores.cCliente = value;
  }
}
