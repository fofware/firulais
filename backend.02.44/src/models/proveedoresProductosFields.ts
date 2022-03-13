import { Schema, model, Document, SchemaTypes } from "mongoose";

export interface IProveedoresProductosFields extends Document {
  provproducto_id: object;
  field: string;
  value: any;
  lista_id: object;
  activo?: boolean;
  new?: boolean;
}

const ProveedoresProductosFieldsSchema = new Schema({
  provproducto_id: {                        // id en proveedoresproductos
    type: Schema.Types.ObjectId
    ,ref: "proveedoresproductos"
    ,$id: '_id'
    ,required: true
  }
  , lista_id: {                        // id en proveedoresproductos
    type: Schema.Types.ObjectId
    ,ref: "proveedoreslistas"
    ,$id: '_id'
    ,required: true
  }
  , field: { type: Schema.Types.String, trim: true, requierd: true, index: true } // Campo para proveedoresproductos
},{
  timestamps: true,
  versionKey: false,
  strict: false
});

export default model<IProveedoresProductosFields>('ProveedoresProductosFields', ProveedoresProductosFieldsSchema);
