import { Schema, model, Document } from "mongoose";

export interface IProveedoresArticulos extends Document {
  proveedor: object;
  codigo: string;
  ean?: string;
  producto?: object;
  hoja: string;
  nombre: string;
  vinput: object;
  vbulto: object;
  vunidad: object;
  nbulto?: string;
  presentacion?: string;
  fabricante?: string;
  marca?: string;
  neme?: string;
  especie?: string;
  rubro?: string;
  linea?: string;
  raza?: string;
  unidad?: string;
}

const ProveedoresArticulosSchema = new Schema({
  proveedor: {                        // id del proveedor
    type: Schema.Types.ObjectId
    ,ref: "Proveedores"
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
  , vinput: {}
  , vbulto: {}
  , vunidad: {}
  , nbulto: { type: String, default: null, index: true }
  , presentacion: { type: String, default: null, index: true }
  , unidad: { type: String, default: null, index: true  }
  , fabricante: { type: String, default: null, index: true  }
  , marca: { type: String, default: null, index: true  }
  , name: { type: String, default: null, index: true  }
  , especie: { type: String, default: null, index: true  }
  , edad: { type: String, default: null, index: true  }
  , rubro: { type: String, default: null, index: true  }
  , linea: { type: String, default: null, index: true  }
  , raza: { type: String, default: null, index: true  }
  , clase: { type: Number, default: null, index: true  }
},{
  timestamps: true,
  versionKey: false,
  strict: false
});

ProveedoresArticulosSchema.index(
  { 
    nombre : "text",
    fabricante: "text",
    marca: "text",
    rubro: "text",
    linea: "text",
    especie: "text",
    edad: "text",
    raza: "text",
    name: "text",
    tags: "text"
  },
  { default_language: "spanish" }
);

ProveedoresArticulosSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error);
});

export default model<IProveedoresArticulos>('ProveedoresArticulos', ProveedoresArticulosSchema);
