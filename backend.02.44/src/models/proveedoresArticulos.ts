import { Schema, model, Document } from "mongoose";

export interface IProveedoresArticulos extends Document {
  proveedor: object;
  codigo: string;
  ean?: string;
  producto?: object;
  hojo: string;
  nombre: string;
  bulto?: number;
  contiene?: number;
  unidad?: string;
}

const ProveedoresArticulosSchema = new Schema({
  proveedor: {
    type: Schema.Types.ObjectId
    ,ref: "personas"
    ,$id: '_id'
    ,required: true
  }
  ,codigo: { type: String, trim: true, required: true }
  ,ean: { type: String, trim: true, default: null }
  ,producto: {
    type: Schema.Types.ObjectId
    ,ref: "productos"
    ,$id: "_id"
    ,default: null
  }
  , hoja: { type: String, trim: true, requierd: false, default: null }
  , nombre: { type: String, trim: true, requierd: false }
  , bulto: { type: Number, default: null }
  , contiene: { type: Number, default: null }
  , unidad: { type: String, default: null }
})
export default model<IProveedoresArticulos>('ProveedoresArticulos', ProveedoresArticulosSchema);