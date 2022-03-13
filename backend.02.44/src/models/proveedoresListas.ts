import { Schema, model, Document } from "mongoose";

export interface IProveedoresListas extends Document {
  _id?: Object;
  proveedor_id: Object;
  name: String;
  last_modified: Number;
  size: Number;
  vigencia: Date;
}

const ProveedoresListasSchema = new Schema({
  proveedor_id: {
    type: Schema.Types.ObjectId
    ,ref: "personas"
    ,$id: '_id'
    , require: true  
  }
  ,name: {
    type: Schema.Types.String
    , require: true  
  }
  ,last_modified: {
    type: Schema.Types.Number
    , require: true  
  }
  ,size: {
    type: Schema.Types.Number
  }
  ,vigencia: {
    type: Schema.Types.Date
    , require: true
  }
},{
  timestamps: true,
  versionKey: false,
  strict: false
})

ProveedoresListasSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error.message);
});

export default model<IProveedoresListas>('ProveedoresListas', ProveedoresListasSchema);
