import { Schema, model, Document } from "mongoose";

export interface IArticulo extends Document {
  name: string;
  image: string;
  url: string;
  iva: number;
  margen: number;
}

const articuloSchema = new Schema({
  name: { type: String, trim: true, unique: true }
  ,image: { type: String, trim: true, required: false }
  ,url: { type: String, trim: true, required: false, default:'' }
  ,iva: {type:Number, default: 0}
  ,margen: { type: Number, default: 35}
})

export default model<IArticulo>('Articulo', articuloSchema);
