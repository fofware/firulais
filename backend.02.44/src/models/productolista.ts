import { Schema, model, Document } from "mongoose";

export interface IProductosList extends Document {
  _id?: object;
  fullName?: object;
  tags?: string;
}

const ProductosListSchema = new Schema({
  _id: { type: Schema.Types.ObjectId }
  , fullName: { type: String, default: '', trim: true }
  , tags: { ref: "tags", type: String, default: ''}
},{
  timestamps: false,
  versionKey: false
})


export default model<IProductosList>('productoslist', ProductosListSchema);
