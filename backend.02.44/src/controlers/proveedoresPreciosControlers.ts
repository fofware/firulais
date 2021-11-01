import {Request, Response, Router} from 'express';
import { ObjectID } from 'bson'
import passport from "passport";
import dbprecios from '../models/proveedoresPrecios';

class ProveedoresPreciosControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
		this.router.get( '/proveedoresprecios', 
    //passport.authenticate('jwt', {session:false}), 
    this.list );
		this.router.post( '/proveedoresprecios/add', 
    //passport.authenticate('jwt', {session:false}), 
    this.add );

	}

  async list(req: Request, res: Response) {
		try {
      const retData = await dbprecios.find().sort({proveedor_lista_id: 1, });
      res.status(200).json(retData);
    } catch (error) {
			return res.status(404).json( error );			
		}
	}

  async add(req: Request, res: Response) {
		let precio_reg = await dbprecios.findOne({ 
                        proveedor_lista_id: req.body.proveedor_lista_id,
												proveedor_articulo: req.body.proveedor_articulo
											});
		if(!precio_reg){
			precio_reg = new dbprecios(req.body);
			const rslt = await precio_reg.save();
		}
    console.log(precio_reg)
    return res.status(200).json(precio_reg);


  }
}

export const ProveedoresPreciosCtrl = new ProveedoresPreciosControler();