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
		/*
		let precio_reg = await dbprecios.findOne({ 
                        proveedor_lista_id: req.body.proveedor_lista_id,
												proveedor_articulo: req.body.proveedor_articulo
											});
		let needUpdate = false;

		if(!precio_reg){
			precio_reg = new dbprecios(req.body);
			const rslt = await precio_reg.save();
		} else {
			for (const key in req.body) {
				if (Object.prototype.hasOwnProperty.call(precio_reg, key)) {
					const element = precio_reg[key];
					if (key === 'vinput'){
						for (const vkey in element) {
							if (Object.prototype.hasOwnProperty.call(element, vkey)) {
								const velement = element[vkey];
								if(velement !== req.body[key][vkey]) {
									needUpdate = true;
									break;
								}
							}
						}
					} else {
						if(element !== req.body[key]){
							needUpdate = true;
							break;
						}
					}
				} else {
					needUpdate = true;
					break;
				}
			}
			if(needUpdate){
				
			}
		}
		*/
    const filter = { 
			proveedor_lista_id: req.body.proveedor_lista_id,
			proveedor_articulo: req.body.proveedor_articulo
		};
    const update = req.body;
		let ret = await dbprecios.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true // Return the raw result from the MongoDB driver
    });
    ret.value instanceof dbprecios; // true
    // The below property will be `false` if MongoDB upserted a new
    // document, and `true` if MongoDB updated an existing object.
    ret.lastErrorObject.updatedExisting; // false
    //console.log('precios',ret);
    return res.status(200).json(ret);
  }
}

export const ProveedoresPreciosCtrl = new ProveedoresPreciosControler();