import { Schema, model, Document } from "mongoose";

//import aggregatePaginate from "mongoose-aggregate-paginate-v2"; //first step
//export const aggregatePaginate = require("mongoose-aggregate-paginate-v2"); //first step
export interface IProductosIdx extends Document {
  _id?: Object;
  producto: Object;
  articulo: Object;
  codigo: String;
  plu: String;
  name: String;
  fabricante: String;
  marca: String;
  rubro: String;
  linea: String;
  especie: String;
  edad: String;
  raza: String;
  tags: String;
  pVenta: Boolean;
  pCompra: Boolean;
  pesable: Boolean;
  contiene: Number;
  unidad: String;
  art_image: String;
//  productocompra: [];
  image: String;
  private_web: Boolean;
}

let ProductosIdxSchema = new Schema({
  producto: { type: Schema.Types.ObjectId, ref: "productos", index: true }
  , articulo: { type: Schema.Types.ObjectId, ref: "articulos", index: true }
  , codigo: { type: String, trim: true, default: '', index: true }
  , plu: { type: String, default: "", index: true }
  , fullName: { type: String, trim: true, default: "", index: true }
  , fabricante: { type: String, trim: true, default: "", index: true }
  , marca: { type: String, trim: true, default: "", index: true }
  , rubro: { type: String, trim: true, default: "", index: true }
  , linea: { type: String, trim: true, default: "", index: true }
  , especie: { type: String, trim: true, default: "", index: true }
  , edad: { type: String, trim: true, default: "", index: true }
  , raza: { type: String, trim: true, default: "", index: true }
  , tags: { type: String, trim: true, default: "", index: true }
  , pVenta: { type: Boolean, default: true, index: true }
  , pCompra: { type: Boolean, default: true, index: true }
  , pesable: { type: Boolean, default: false, index: true }
  , name: { type: String, trim: true, default: "", index: true }
  , contiene: { type: Number, default: 0, index: true }
  , unidad: { type: String, trim: true, default: "" }
  , art_image: { type: String, trim: true, default: "" }
  , image: { type: String, trim: true, default: "" }
  , images: {type: Array, default: []}
  , videos: {type: Array, default: []}
//  , productocompra: { type: Array, default: [] }
  , socialWeb: { type: Array, default: [], index: true }
  , private_web: { type: Boolean, default: false, index: false } 
},{
  timestamps: false,
  versionKey: false,
  strict: false
})

ProductosIdxSchema.index(
  { 
    fullName : "text",
    name : "text",
    fabricante: "text",
    marca: "text",
    rubro: "text",
    linea: "text",
    especie: "text",
    edad: "text",
    raza: "text",
    tags: "text",
    contiene: "text",
    unidad: "text"
  },
  { 
    name: "ProductosTextIndex"
  }
)

ProductosIdxSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error.message);
});

//ProductosIdxSchema.plugin(aggregatePaginate);

export default model<IProductosIdx>('productosIdx', ProductosIdxSchema);