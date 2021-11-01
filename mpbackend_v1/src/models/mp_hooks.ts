import { Schema, model, Document, isValidObjectId } from "mongoose";

export interface IMPHooks extends Document {
  mensaje: object;
};

const MPHooksSchema = new Schema({
  mensaje: { type: Object}
},{
  timestamps: false,
  versionKey: false,
  strict: false
});

export default model<IMPHooks>('mp_hooks', MPHooksSchema);
