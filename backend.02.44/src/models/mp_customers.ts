import { Schema, model, Document, isValidObjectId } from "mongoose";

export interface IMPCustomers extends Document {
  mensaje: object;
};

const MPCustomersSchema = new Schema({
  mensaje: { type: Object}
},{
  timestamps: false,
  versionKey: false,
  strict: false
});

export default model<IMPCustomers>('mp_Customers', MPCustomersSchema);
