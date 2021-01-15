import { Schema, model, Document } from "mongoose";

export interface IArticulo extends Document {
  fabricante: string;
  marca: string;
  rubro: string;
  linea: string;
  name: string;
  p_fabricante: boolean;
  p_marca: boolean;
  p_rubro: boolean;
  p_linea: boolean;
  image: string;
  url: string;
  iva: number;
  margen: number;
  fullName: () => {}
}

const articuloSchema = new Schema({
  fabricante: { type: String, trim: true, default: ''}, // Nestle
  marca: { type: String, trim: true, default: ''},      // Purina Dog Chow / Purina Cat Chow
  rubro: { type: String, trim: true, default: ''},      // Alimento Seco / Alimento Húmedo
  linea: { type: String, trim: true, default: ''},      // ???????
  name: { type: String, trim: true, default: '' },      // Gatitos Carne y Leche
  d_fabricante: {type: Boolean, default: false },
  d_marca: {type: Boolean, default: true },
  d_rubro: {type: Boolean, default: false },
  d_linea: {type: Boolean, default: false },
  image: { type: String, trim: true, required: false },
  url: { type: String, trim: true, required: false, default:'' },
  iva: {type:Number, default: 0},
  margen: { type: Number, default: 35}
})

articuloSchema.methods.fullName = function(): string  {
  const a: any = this;
  let name = '';
  let sep = '';
  if (a.p_fabricante) {
    name += a.fabricante;
    sep = " ";
  }
  if (a.p_marca){
    name += `${sep}${a.marca}`;
    sep = ' ';
  }
  if (a.p_rubro){
    name += `${sep}${a.rubro}`;
    name += a.rubro;
    sep = ' ';
  }
  if (a.p_linea){
    name += `${sep}${a.linea}`;
    name += a.linea;
    sep = ' ';
  }
  return `${name}${sep}${a.name}`;
};

export default model<IArticulo>('Articulo', articuloSchema);

