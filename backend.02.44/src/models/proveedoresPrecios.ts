import { Schema, model, Document } from "mongoose";

export interface IProveedoresPrecios extends Document {
  _id?: object;
  id_proveedor: object;
  id_lista: object;
  codigo_proveedor: String;
  codigo_ean: string;
  fecha: object;
  precio_lista: number;
  coef_descuento: number;
  coef_retenciones: number;
  precio_final: number;
  id_articulo?: object;
  id_producto?: object;
}
const ProveedoresPreciosSchema = new Schema({
  _id:{
    type: Schema.Types.ObjectId
  }
  ,id_proveedor: {
    type: Schema.Types.ObjectId
    ,ref: "personas"
    ,$id: '_id'
  }
  ,id_lista: {
    type: Schema.Types.ObjectId
    ,ref: "ProveedoresListas"
    ,$id: '_id'
  }
  ,codigo_proveedor: {
    type: Schema.Types.String
  }
  ,codigo_ean: {
    type: Schema.Types.String
  }
  ,fecha:{
    type: Schema.Types.Date
  }
  ,precio_lista: {
    type: Schema.Types.Number
  }
  ,coef_descuento: {
    type: Schema.Types.Number
  }
  ,coef_retenciones: {
    type: Schema.Types.Number
  }
  ,precio_final: {
    type: Schema.Types.Number
  }
  ,id_articulo: {
    type: Schema.Types.ObjectId
    ,ref: "articulos"
    ,$id: '_id'
  }
  ,id_producto: {
    type: Schema.Types.ObjectId
    ,ref: "productos"
    ,$id: "_id"
  }
},{
  timestamps: true,
  versionKey: true
})
export default model<IProveedoresPrecios>('ProveedoresPrecios', ProveedoresPreciosSchema);
