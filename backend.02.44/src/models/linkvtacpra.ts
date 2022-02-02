import { Schema, model, Document, Model } from "mongoose";

export interface IlinkVtaCpra extends Document {
  producto_id: Object;
  producto_cpra: Object;
  compra: Date;
  prefered: Boolean;
}

const linkVtaCpraSchema = new Schema({
  producto_id: { type: Schema.Types.ObjectId, ref: "productos", index: true },
  producto_cpra: { type: Schema.Types.ObjectId, ref: "proveedoresarticulos", index: true },
  prefered: { type: Schema.Types.Boolean, default: false }
},{
  timestamps: false,
  versionKey: false,
  strict: false
});

export default model<IlinkVtaCpra>( 'linkvtacpra', linkVtaCpraSchema);
