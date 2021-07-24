import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt"

export interface IRetencion {
  nombre: string;
  porcentaje: number;
  base: number;
}

export interface IPersona extends Document {
  _id?: object;
  email: string;        // check unique se debe verificar con un correo
  emailverificado: boolean;
  apellido: string;
  nombre: string;
  cuit: string;         // check unique
  fijo: string;         // puede ser un array y se debe chequear que no lo tenga otro, puede haber sido otrogado recientemente y era de otro usuario
  celular: string;      // check unique? lo puede cambiar, alguien pierde el nro y este usuario lo compra puede verificar con whatsapp o msg
  celularVerificado: boolean;
  whatsapp: boolean;
  whatsappverificado: boolean;
  direccion: string;
  localidad: string;
  provincia: string;
  zipcode: string;
  pais: string;
  coeficiente: string;
  categoria: [];
  retiene:[]

//  comparePassword: (password: string) => Promise<boolean>

}
const personaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId }
  , email:{ type: String, lowercase: true, trim: true }
  , emailverificado: { type: Boolean, default: false }
  , apellido: { type: String, trim: true }
  , nombre: { type: String, trim: true }
  , cuit:{ type: String, trim: true }
  , fijo: { type: String, trim: true }
  , celular: { type: String, trim: true }
  , celularverificado: { type: Boolean, default: false }
  , whatsapp: { type: Boolean, default: false }
  , whatsappverificado: { type: Boolean, default: false }
  , direccion: { type: String, trim: true }
  , localidad: { type: String, trim: true }
  , provincia: { type: String, trim: true }
  , zipcode: { type: String, trim: true }
  , pais: { type: String, trim: true }
  , coeficiente: { type: Number, default: 1 }
  , categoria: { type: Array, default: [] }
  , retiene: { type: Array, default: [] }
})
/*
userSchema.pre<IPersona>('save', async function(next) {
  const user = this;
  if(!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function ( password: string ): Promise<boolean> {
  return await bcrypt.compare(password, this.password );
};
*/
export default model<IPersona>( 'Persona', personaSchema);