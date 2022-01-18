import {Request, Response, Router} from 'express';
import passport from "passport";
import proveedor from "../models/proveedores"
import { ObjectID } from 'bson'

class ProveedoresControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/proveedores/list',passport.authenticate('jwt', {session:false}), this.list );
    this.router.post('/proveedores/save',passport.authenticate('jwt', {session:false}), this.save );
  }

	public index(req: Request, res: Response) {
		res.send('Proveedores');
	}

	async list(req: Request, res: Response) {
		//console.log(req.user);
		const users = await proveedor.find().sort({name: 1}).sort({nombre: 1});
		res.json(users);
	}
	async save(req: Request, res: Response) {
		try {

			const filter = req.body._id ? { _id: req.body._id } : { nombre: req.body.nombre };
			
			const update = req.body;
			console.log(req.body);
			//await provArt.countDocuments(filter); // 0

			let ret = await proveedor.findOneAndUpdate(filter, update, {
  			new: true,
  			upsert: true,
  			rawResult: true // Return the raw result from the MongoDB driver
			});

			ret.value instanceof proveedor; // true
			// The below property will be `false` if MongoDB upserted a new
			// document, and `true` if MongoDB updated an existing object.
			ret.lastErrorObject.updatedExisting; // false
			console.log(ret);
			return res.status(200).json(ret);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
}

export const ProveedoresCtrl = new ProveedoresControler();