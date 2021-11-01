import { Schema, model, Document } from "mongoose";

export interface IProveedoresListas extends Document {
  _id?: Object;
  proveedor_id: Object;
  file_name: String;
  last_modified: Number;
  size: Number;
}

const ProveedoresListasSchema = new Schema({
  proveedor_id: {
    type: Schema.Types.ObjectId
    ,ref: "personas"
    ,$id: '_id'
    , require: true  
  }
  ,file_name: {
    type: Schema.Types.String
    , require: true  
  }
  , last_modified: {
    type: Schema.Types.Number
    , require: true  
  }
  ,size: {
    type: Schema.Types.Number
  }
},{
  timestamps: true,
  versionKey: false
})

ProveedoresListasSchema.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error.message);
});

export default model<IProveedoresListas>('ProveedoresListas', ProveedoresListasSchema);
