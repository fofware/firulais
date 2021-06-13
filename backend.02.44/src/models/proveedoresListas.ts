import { Schema, model, Document } from "mongoose";

export interface IProveedoresListas extends Document {
  _id?: object;
  id_proveedor: object;
  codigo_proveedor: String;
  codigo_ean: string;
//  registro: string;
  fabricante?: string;
  marca?: string;
  especie?: string;
  edad?: string;
  raza?: string;
  rubro?: string;
  linea?: string;
  name?: string;
  descripcion?: string;
  bulto?: number;
  bname?: string;
  contiene?: number;
  cname?: string;
  unidad?: string;
  precio_lista?: number;
  coef_descuento?: number;
  coef_retenciones?: number;
  precio_final?: number;
  id_articulo?: object;
  id_producto?: object;
}
const ProveedoresListasSchema = new Schema({
  _id:{
    type: Schema.Types.ObjectId
  }
  ,id_proveedor: {
    type: Schema.Types.ObjectId
    ,ref: "personas"
    ,$id: '_id'
  }
  ,codigo_proveedor: {
    type: Schema.Types.String
  }
  ,codigo_ean: {
    type: Schema.Types.String
  }
  ,fabricante: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,marca: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,especie: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,edad: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,raza: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,rubro: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,linea: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,name: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,descripcion: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,bulto: {
    type: Schema.Types.Number
  }
  ,bname: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,contiene: {
    type: Schema.Types.Number
  }
  ,cname: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
  }
  ,unidad: {
    type: Schema.Types.String
    ,lowercase: true, trim: true
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
export default model<IProveedoresListas>('ProveedoresListas', ProveedoresListasSchema);
