import { Schema, model, Document, isValidObjectId } from "mongoose";

export interface IMercadoPagoIpn extends Document {
  mensaje: object;
};

const MercadoPagoIpnSchema = new Schema({
  mensaje: { type: Object}
},{
  timestamps: false,
  versionKey: false,
  strict: false
});

export default model<IMercadoPagoIpn>('mp_ipn', MercadoPagoIpnSchema);
