import { Schema, model, Document } from "mongoose";

export interface IProveedoresProductos extends Document {
  proveedor: object;
  hoja: string;
  codigo: string;
  nombre: string;
  ean?: string;
  peso?: number;
  unidades?: number;
  producto_id?: object;
  fieldsvalues:[];
}

const ProveedoresProductosSchema = new Schema({
  proveedor: {                        // id del proveedor
    type: Schema.Types.ObjectId
    ,ref: "Proveedores"
    ,$id: '_id'
    ,required: true
  }
  , hoja: { type: String, trim: true, requierd: false, default: null }
  , codigo: {                          // codigo del producto en el proveedor
    type: Schema.Types.String
    , trim: true
    , required: true
    , index: true
  }
  , error: { type: Schema.Types.Number, default: 0, index: true  } 
  , nombre: { type: Schema.Types.String, trim: true, requierd: false }
  , ean: {                             // codigo EAN (código de barras)
    type: Schema.Types.String
    , trim: true
    , default: null
    , index: true
  }
  , peso: { type: Number, default: null, index: true  }
  , unidades: { type: Schema.Types.Number, default: null, index: true  }
  , producto_id: {                        // id del producto en nuestro sistema
    type: Schema.Types.ObjectId
    , ref: "productos"
    , $id: "_id"
    , default: null
    , index: true
  }
  ,fieldsvalues:[{
     type: Schema.Types.ObjectId
    , ref: "ProveedoresProductosFields"
    //, $id: '_id'
    //, default: []
  }]
},{
  timestamps: true,
  versionKey: false,
  strict: true
});

ProveedoresProductosSchema.index(
  { 
    nombre : "text",
  },
  { default_language: "spanish" }
);

ProveedoresProductosSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error);
});

export default model<IProveedoresProductos>('ProveedoresProductos', ProveedoresProductosSchema);
