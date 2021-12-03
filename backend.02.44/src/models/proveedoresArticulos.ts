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
  proveedor: {                        // id del proveedor
    type: Schema.Types.ObjectId
    ,ref: "Persona"
    ,$id: '_id'
    ,required: true
  }
  ,codigo: {                          // codigo del producto en el proveedor
    type: String
    , trim: true
    , required: true 
    , index: true
  }
  ,ean: {                             // codigo EAN (código de barras)
    type: String
    , trim: true
    , default: null
    , index: true
  }
  ,articulo_id: {                        // id del articulo en nuestro sistema
    type: Schema.Types.ObjectId
    , ref: "articulos"
    , $id: "_id"
    , default: null
    , index: true
  }
  ,producto_id: {                        // id del producto en nuestro sistema
    type: Schema.Types.ObjectId
    , ref: "productos"
    , $id: "_id"
    , default: null
    , index: true
  }
  , hoja: { type: String, trim: true, requierd: false, default: null }
  , nombre: { type: String, trim: true, requierd: false }
  , bulto: { 
    type: Number
    , default: null 
    , index: true
  }
  , contiene: { 
    type: Number
    , default: null 
    , index: true
  }
  , unidad: { 
    type: String
    , default: null 
  }
},{
  timestamps: true,
  versionKey: false
});

ProveedoresArticulosSchema.index(
  { nombre : "text" },
  { default_language: "spanish" }
)

ProveedoresArticulosSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error);
});

export default model<IProveedoresArticulos>('ProveedoresArticulos', ProveedoresArticulosSchema);