import { Schema, model, Document, SchemaTypes } from "mongoose";

export interface IProveedoresPrecios extends Document {
  proveedor_lista_id: Object;
  proveedor_id: Object;
  proveedor_articulo: Object;
  producto_id?: Object;
  fecha: Object;
  vinput: Object;
  vbulto: Object;
  vunidad: Object;
}

const ProveedoresPreciosSchema = new Schema({
  proveedor_lista_id: {
    type: Schema.Types.ObjectId
    ,ref: "ProveedoresListas"
    ,$id: '_id'
    ,index: true
  },
  proveedor_id: {
    type: Schema.Types.ObjectId
    ,ref: "proveedores"
    ,$id: "_id"
    ,index: true
  },
  proveedor_articulo: {
    type: Schema.Types.ObjectId
    ,ref: "ProveedoresArticulos"
    ,$id: '_id'
    ,index: true
  }
  ,producto_id: {
    type: Schema.Types.ObjectId
    ,ref: "productos"
    ,$id: "_id"
    ,index: true
  }
  ,lista: {
    type: Schema.Types.Number
  }
  ,vinput: {}
  ,vbulto: {}
  ,vunidad: {}
},{
  timestamps: false,
  versionKey: false
});

ProveedoresPreciosSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error.message);
});

export default model<IProveedoresPrecios>('ProveedoresPrecios', ProveedoresPreciosSchema);
