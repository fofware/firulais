import { Schema, model, Document } from "mongoose";

export interface IComprobanteItems extends Document {
  _id?: object;
  articuloId?: object;
  productoId?: object;
  barcode?: string;
  plu?: number;
  name?: string;
  compra?: number;
  precio?: number;
  reposicion?: number;
  precioLista?: number;
  a_pago?: number;
  a_persona?: number;
  a_lista?: number;
  rPrecio?: number;
  cantidad?: number;
  sumaCompra?: number;
  sumaReposicion?: number;
  sumaAjuste?: number;
  sumaBruto?: number;
  sumaNeto?: number;
  sumaPrecio?: number;
  descuento?: number
  iva?: []
  sumaIva?: number;
  percepciones?: []
  sumaPercepciones?: number;
  retenciones?: []
  sumaRetenciones?: number;
  sumaTotal?: number;
  stock?:object;
  stock_coef?:number;
  stock_id?:object;
  tipo?:number;
}



const ComprobanteItemsSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  articuloId: { type: Schema.Types.ObjectId },
  productoId: { type: Schema.Types.ObjectId },
  barcode: {type: String, default: ''},
  plu: {type: Number},
  name: {type: String, default: ""},
  compra: { type: Number, default: 0},
  precio: { type: Number, default: 0 },
  precioLista: { type: Number, default: 0 },
  reposicion: { type: Number, default: 0},
  a_pago: { type: Number, default: 0 },
  a_persona: { type: Number, default: 0 },
  a_lista: { type: Number, default: 0 },
  rPrecio: { type: Number, default: 0 },
  cantidad: { type: Number, default: 0 },
  sumaCompra: { type: Number, default: 0 },
  sumaReposicion: { type: Number, default: 0 },
  sumaAjuste: { type: Number, default: 0 },
  sumaBruto: { type: Number, default: 0 },
  sumaNeto: { type: Number, default: 0 },
  sumaPrecio: { type: Number, default: 0 },
  descuento: { type: Number, default: 0 },
  iva: [],
  sumaIva: { type: Number, default: 0 },
  percepciones: [],
  sumaPercepciones: { type: Number, default: 0 },
  retenciones: [],
  sumaRetenciones: { type: Number, default: 0 },
  sumaTotal: { type: Number, default: 0 },
  stock: {type: Object},
  stock_coef: { type: Number, default: 0 },
  stock_id: { type: Schema.Types.ObjectId },
  tipo: { type: Number, default: 0 }
});

export default model<IComprobanteItems>('comprobanteitems', ComprobanteItemsSchema);
