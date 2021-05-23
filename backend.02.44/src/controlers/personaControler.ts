import {Request, Response, Router} from 'express';
import passport from "passport";
import persona from '../models/persona';
import { ObjectID } from 'bson'

class PersonaControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/api/personas/fulllist',passport.authenticate('jwt', {session:false}), this.fulllist );
    this.router.post('/api/personas/list',passport.authenticate('jwt', {session:false}), this.list );
    this.router.get('/api/personas/search/:search',passport.authenticate('jwt', {session:false}), this.search );
    this.router.delete('/api/persona/:id',passport.authenticate('jwt', {session:false}), this.delete );
    this.router.get('/api/persona/:id',passport.authenticate('jwt', {session:false}), this.get );
    this.router.put('/api/persona/:id',passport.authenticate('jwt', {session:false}), this.put );
    this.router.post('/api/persona/add',passport.authenticate('jwt', {session:false}), this.add );
    this.router.post('/api/persona/find',passport.authenticate('jwt', {session:false}), this.find );
    this.router.post('/api/persona/import', //passport.authenticate('jwt', {session:false}), 
											this.import );
  }

	public index(req: Request, res: Response) {
		res.send('Usuarios');
	}

	async fulllist(req: Request, res: Response): Promise<void> {
		try {
			const newReg = await persona.find().sort({'apellido':1, 'nombre':1});
			res.status(200).json(newReg);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async import(req: Request, res: Response): Promise<void> {
		//		await this.setIds( req.body );
		if ( req.body._id ) req.body._id = new ObjectID( req.body._id );
		try {
			const newReg = await persona.updateOne(
								{ _id: req.body._id },   // Query parameter
								{ $set: req.body }, 
								{ upsert: true }    // Options
							);
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', newReg });
		} catch (error) {
			res.status(500).json(error);
		}
	}
		
	async list(req: Request, res: Response) {
		const personas = await persona.find().sort({name: 1});
		res.json(personas);
	}

	async get(req: Request, res: Response) {
		const { id } = req.params
		persona.findById(id)
		.then( rpta => {
			return res.status(200).json(rpta);
		}).catch( err => {
			return res.status(404).json( err );
		})
	}
	
	async delete( req: Request, res: Response ){
		try {
			const { id } = req.params;
			const rpta = await persona.findByIdAndDelete(id);
			res.status(200).json(rpta);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}

	}

	async add( req: Request, res: Response ){
//		const art = await persona.findOne({ name: req.body.name });
//		if (art)
//			return res.status(400).json({ msg: 'Persona ya existe', art });
			const newReg = new persona(req.body);
			await newReg.save();
			return res.status(200).json({ msg: 'Usuario creado satisfactoriamente', newReg });
	}

	async put( req: Request, res: Response) {
		try {
			const { id } = req.params;
			const rpta = await persona.findOneAndUpdate ({ _id: new ObjectID(id)}, { $set :  req.body  })
			res.status(200).json({ msg:"Update Ok" });
		} catch (error) {
			res.status(500).json( error );
		}
	}

	async search ( req: Request, res: Response ) {
		try {
			const { search } = req.params
			const qry = { $or: [ {"apellido": { $regex: new RegExp( search , 'i') }}, {"nombre": { $regex: new RegExp( search , 'i')}} ] }
			const rpta = await persona.find( qry ).sort({name: 1});
		} catch ( error ) {
			res.status(500).json( error );
		}

	}

	async find( req: Request, res: Response){
		try {
			console.log(req.body);
			const qry = { $or: [ {"apellido": { $regex: new RegExp( req.body.search , 'i') }}, {"nombre": { $regex: new RegExp( req.body.search , 'i')}} ] }
			const rpta = await persona.find( qry ).sort({name: 1});
			res.status(200).json(rpta);
		} catch ( error ) {
			res.status(500).json( error );
		}
	}

}

export const personaCtrl = new PersonaControler();