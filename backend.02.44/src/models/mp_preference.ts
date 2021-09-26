import { Schema, model, Document, isValidObjectId } from "mongoose";

export interface IMPPreference extends Document {
  mensaje: object;
};

const MPPreferenceSchema = new Schema({
  mensaje: { type: Object}
},{
  timestamps: false,
  versionKey: false,
  strict: false
});

export default model<IMPPreference>('mp_preference', MPPreferenceSchema);
