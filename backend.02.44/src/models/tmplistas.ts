import { Schema, model, Document, Model } from "mongoose";

export interface ITmpLista extends Document {
  tmpID: object;            // id de la lista que se está procesando
};

const tmpListaSchema = new Schema({
  tmpID:{ type: Schema.Types.ObjectId, required: true }
},{
  timestamps: true,
  versionKey: false,
  strict: false
})

export default model<ITmpLista>( 'tmpLista', tmpListaSchema);