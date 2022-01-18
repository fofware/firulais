import { Schema, model, Document } from "mongoose";

export interface IProveedores extends Document {
  nombre: { type: String, trim: true, requierd: true, index: true },
}

const ProveedoresSchema = new Schema({
  nombre: { type: String, trim: true, requierd: false }
},{
  timestamps: true,
  versionKey: false,
  strict: false
});

ProveedoresSchema.index(
  { nombre : "text" },
  { default_language: "spanish" }
)

ProveedoresSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error);
});

export default model<IProveedores>('Proveedores', ProveedoresSchema);