import { Schema, model, Document } from "mongoose";

export interface IProveedoresPrecios extends Document {
  id_proveedorArticulo: object;
  fecha: object;
  id_proveedor?: object;
  id_producto?: object;
  precio_lista: number;
  reposicion: number;
  precios:[];
}

const ProveedoresPreciosSchema = new Schema({
  id_proveedoresArticulo: {
    type: Schema.Types.ObjectId
    ,ref: "ProveedoresArticulos"
    ,$id: '_id'
  }
  ,fecha:{
    type: Schema.Types.Date
  }
  ,id_proveedor: {
    type: Schema.Types.ObjectId
    ,ref: "personas"
    ,$id: "_id"
  }
  ,id_producto: {
    type: Schema.Types.ObjectId
    ,ref: "productos"
    ,$id: "_id"
  }
  ,reposicion: {
    type: Schema.Types.Number
  }
  ,precios: []
},{
  timestamps: true,
  versionKey: true
})
export default model<IProveedoresPrecios>('ProveedoresPrecios', ProveedoresPreciosSchema);
