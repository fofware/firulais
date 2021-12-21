import { Schema, model, Document, isValidObjectId } from "mongoose";
import { ObjectID } from 'bson'

export interface IEquivalencias extends Document {
  fabricante: string;
  marca: string;
  rubro: string;
  linea: string;
  especie: string;
  edad: string;
  raza: string;
  name: string;
  d_fabricante: boolean;
  d_marca: boolean;
  d_rubro: boolean;
  d_linea: boolean;
  d_especie: boolean;
  d_edad: boolean;
  d_raza: boolean;
  private_web: boolean;
  image: string;
  images: [];
  videos: [];
  url: string;
  iva: number;
  margen: number;
  tags: string;
  formula: [];
  detalles: [];
  beneficios: [];
//  getFullName: () => Promise<string>
  setObjectIDs: () => Promise<void>
};

const equivalenciaSchema = new Schema({
  proveedor: { type: Schema.Types.ObjectId, ref: "proveedores", index: true }
  , prov_codigo: { type: String, trim: true, default: '', index: true }
  , prov_description: { type: String, trim: true, default: '', index: true }

  //  
  , articulo: { type: Schema.Types.ObjectId, ref: "articulos", index: true }
  , fabricante: { type: String, trim: true, default: '', index: true } // Nestle
  , marca: { type: String, trim: true, default: '', index: true }      // Purina Dog Chow / Purina Cat Chow
  , rubro: { type: String, trim: true, default: '', index: true }      // Alimento Seco / Alimento Húmedo
  , linea: { type: String, trim: true, default: '', index: true }      // ???????
  , especie: { type: String, trim: true, default: '', index: true }   // Gato
  , edad: { type: String, trim: true, default: '', index: true }
  , raza: { type: String, trim: true, default: '', index: true }
  , art_name: { type: String, trim: true, default: '', index: true }      // Gatitos Carne y Leche
  , private_web: {type: Boolean, default: false, index: true }
  , art_image: { type: String, trim: true, required: false }
  , art_images: [{ type: String, trim: true, required: false }]
  , art_videos:[{ type: String, trim: true, required: false }]
  , url: { type: String, trim: true, required: false, default:'' }
  , art_iva: {type:Number, default: 0}
  , art_margen: { type: Number, default: 35}
  , art_tags: { type: String, trim: true, default: '', index: true }
  //
  , producto: { type: Schema.Types.ObjectId, ref: "productos", index: true }
  , parent: { type: Schema.Types.ObjectId, ref: "productos", default: null }
  , prod_name: { type: String, trim: true, default: "", index: true }
  , contiene: { type: Number, default: 0, index: true }
  , unidad: { type: String, trim: true, default: "" }
  , precio: { type: Number, default: 0 }
  , precio_desde: { type: Schema.Types.Date }
  , precio_hasta: { type: Schema.Types.Date }
  , compra: { type: Number, default:0 }
  , compra_fecha: { type: Schema.Types.Date }
  , reposicion: { type: Number, default:0 }
  , reposicion_fecha: { type: Schema.Types.Date }
  , pesable: { type: Boolean, default: false, index: true }
  , servicio: { type: Boolean, default: false, index: true }
  , pVenta: { type: Boolean, default: true, index: true }
  , pCompra: { type: Boolean, default: true, index: true }
  , ean: { type: String, trim: true, default: '', index: true }
  , plu: { type: String, default: "", index: true }
  , image: { type: String, trim: true, default: "" }
  , stock: { type: Number, default: 0 }
  , stockMin: { type: Number, default: 0 }
  , stockMax: { type: Number, default: 0 }
  , prod_iva: { type:Number, default: 0 }
  , prod_margen: { type: Number, default: 35 }
  , prod_images: [{ type: String, trim: true, required: false }]
  , prod_videos:[{ type: String, trim: true, required: false }]
  , prod_tags: { ref: "tags", type: String, default: ''}

});

equivalenciaSchema.index(
  {
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
  {
    default_language: "spanish",
    name: "ArticuloTextIndex"
  }
)

equivalenciaSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error.message);
});

equivalenciaSchema.methods.setObjectIDs = async function (): Promise<void> {
  this._id = new ObjectID(this._id);
}

export default model<IEquivalencias>('Equivalencias', equivalenciaSchema);