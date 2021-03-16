import { Schema, model, Document } from "mongoose";
import { IComprobanteItems } from "./comprobanteitem";

export interface IComprobante extends Document {
  _id?: object;
  ca_lista?: object;
  ca_pago?: object;
  cae?: string;
  operador?: object;
//  emisor: {};  
  fecha?: Date;
  sucursal?: string;
  numero?: number;
  operacion?: string;
  persona?: object;
  tipo?: string;
  items?: IComprobanteItems[];
  bultos?: number;
  sumaCompra?: number;
  sumaReposicion?: number;
  sumaNeto?: number;
  pagoTipo?: number;
  sumaAjustes?: number;
  sumaBruto?: number;
  sumaivas?: object[];
  sumaIva?: number;
  percepsiones?: object[];
  sumaPercepciones?: number;
  retenciones?: object[];
  sumaRetenciones?: number;
  sumaTotal?: number;
}

const ComprobanteSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  ca_lista: {type: Object, default: {}},
  ca_pago: {type: Object, default: {}},
  operador: { type: Schema.Types.ObjectId, ref: 'users' },
//  emisor: {type: Object, default: {} },
  cae: {type: String, defult: '' },
  fecha: {type: Date },
  sucursal: { type: String, default: "0002" },
  numero: {type: Number, default: 0},
  operacion: {type: String, defult: "" },
  persona: {type: Object, default: {}},
  tipo: {type: String, defult: "" },
  items: { type: Array, default: [] },
  bultos: { type: Number, default: 0 },
  sumaCompra: {type: Number, default: 0},
  sumaReposicion: {type: Number, default: 0},
  sumaNeto: {type: Number, default: 0},
  pagoTipo: {type: Number, default: 0},
  sumaAjustes: {type: Number, default: 0},
  sumaBruto: {type: Number, default: 0},
  sumaivas: { type: Array, default: [] },
  sumaIva: {type: Number, default: 0},
  percepsiones: { type: Array, default: [] },
  sumaPercepciones: {type: Number, default: 0},
  retenciones: { type: Array, default: [] },
  sumaRetenciones: {type: Number, default: 0},
  sumaTotal: {type: Number, default: 0}
});

export default model<IComprobante>('comprobantes', ComprobanteSchema);
