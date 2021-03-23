import { Request, Response, Router } from 'express';
import articulo, { IArticulo } from '../models/articulos';
import { ObjectID } from 'bson'
import { sanitize } from '../common/utils'
import producto, { IProducto } from '../models/producto';
import passport from "passport";
/*
			{ $graphLookup:
				{
					from: "productos"
					,startWith: "$_id"
					,connectFromField: "parent"
					,connectToField: "articulo"
					,as: "productos"
					,restrictSearchWithMatch: qry.Producto
				}
			},
			{
				$lookup: {
					from: 'productos',
					localField: "_id",
					foreignField: "articulo",
					as: 'productos'
				}
			},
*/
export const artProject = {
	'_id': 1,
	'tags': 1,
	'fabricante': 1,
	'marca': 1,
	'rubro': 1,
	'linea': 1,
	'especie': 1,
	'edad': 1,
	'raza': 1,
	'name': 1,
	'd_fabricante': 1,
	'd_marca': 1,
	'd_rubro': 1,
	'd_linea': 1,
	'd_especie': 1,
	'd_raza': 1,
	'd_edad': 1,
	'private_web': 1,
	'image': 1,
	'url': 1,
	'iva': 1,
	'margen': 1,
	'fullName': { $trim: 
		{ input: 
			{	$concat: [
				{ $cond: ['$d_fabricante', 'fabricante', '']},
				{ $cond: ['$d_marca', ' ', '']},
				{ $cond: ['$d_marca', '$marca', '']},
				{ $cond: ['$d_linea', ' ', '']},
				{ $cond: ['$d_linea', '$linea', '']},
				{ $cond: ['$d_especie', ' ', '']},
				{ $cond: ['$d_especie', '$especie', '']},
				{ $cond: ['$d_edad', ' ', '']},
				{ $cond: ['$d_edad', '$edad', '']},
				{ $cond: ['$d_raza', ' ', '']},
				{ $cond: ['$d_raza', '$raza', '']},
				' ',
				'$name'
				]
			}
		}
	}
};

export const readArticulos = async function (qry: any): Promise<any> {
	if (!qry.Articulo) qry.Articulo = {};
	if (!qry.Sort) qry.Sort = { fullName: 1 };
	if (!qry.Project) qry.Project = artProject;
	try {
		const rpta = await articulo.aggregate([
			{ $match: qry.Articulo },
			{
				$project: qry.Project
			},
			{
				$sort: qry.Sort
			}
		]);
		return rpta;
	} catch (error) {
		console.log(error);
		return { error };
	}
}

export const readProductos = function ( qry: any ): PromiseLike<any[]> {
	if (!qry.Articulo) qry.Articulo = {};
	if (!qry.Producto) qry.Producto = {};
	if (!qry.Project){
		qry.Project = artProject; 
		qry.Project.productos = 1;
	}
	if (!qry.Sort) qry.Sort = {fullName: 1};
	return articulo.aggregate([
		{ $match: qry.Articulo }
		,{ $graphLookup:
			{
				from: "productos"
				,startWith: "$_id"
				,connectFromField: "parent"
				,connectToField: "articulo"
				,as: "productos"
				,restrictSearchWithMatch: qry.Producto
			}
		},
		{
			$project: qry.Project
		},
		{
			$sort: qry.Sort
		}
	]);
}	

export const articuloSanitizeString = function (search: string) {
	if(!search || search.length == 0) return null;
	const Articulo = {'$and': []};
	const searchItem = search.replace(/  /g, ' ');
	const array: any[] = searchItem.trim().split(' ');

	for (let index = 0; index < array.length; index++) {
		const element = array[index];
		const o = [{'name': {$regex: new RegExp( `${element}` , 'i')}},
			{'fabricante': {$regex: new RegExp( `${element}` , 'i')}},
			{'marca': {$regex: new RegExp( `${element}` , 'i')}},
			{'rubro': {$regex: new RegExp( `${element}` , 'i')}},
			{'linea': {$regex: new RegExp( `${element}` , 'i')}},
			{'especie': {$regex: new RegExp( `${element}` , 'i')}},
			{'edad': {$regex: new RegExp( `${element}` , 'i')}},
			{'raza': {$regex: new RegExp( `${element}` , 'i')}},
			{'tags': {$regex: new RegExp( `${element}` , 'i')}}
		]
		Articulo['$and'].push({'$or': o });
	}
	return Articulo;
}

class ArticuloControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
		this.router.get( '/articulo/:id', this.leer );
		this.router.get( '/articulo/productos/:id', this.leerProductos );

		this.router.delete( '/articulo/:id', this.delete );
		this.router.post( '/articulo', this.add );
		this.router.post( '/articulo/import', this.import );
		this.router.put( '/articulo/:id', this.modifica );

		this.router.get( '/articulos/test', this.test );
		this.router.get( '/articulos/list', this.searchArticulos );
		this.router.get( '/articulos/list/:search', this.searchArticulos )
		this.router.post( '/articulos/list', this.findArticulos );

//		this.router.get( '/articulos/productos/list', passport.authenticate('jwt', { session: false }), this.productosList );
//		this.router.post( '/articulos/productos/list', passport.authenticate('jwt', { session: false }), this.productosList );



		this.router.get( '/articulos/productos/list', this.searchProductos );
		this.router.get( '/articulos/productos/list/:search', this.searchProductos );
		this.router.post( '/articulos/productos/list', this.findProductos );
	}

	public index(req: Request, res: Response) {
		res.send('Articulos');
	}

	async leer(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const qry = {Articulo: { _id: new ObjectID(id) } };
			const rpta = await readArticulos(qry);
			return res.status(200).json(rpta);
		} catch (error) {
			return res.status(404).json( error );			
		}
	}

	async leerProductos(req: Request, res: Response) {
		try {
			const qry = {Articulo:{_id: new ObjectID(req.params.id) }};
			const rpta = await readProductos(qry)
			res.status(200).json(rpta[0])
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async delete( req: Request, res: Response ){
		try {
			const { id } = req.params;
			const proddel = await producto.deleteMany( { 'articulo':  new ObjectID(id) } );
			console.log(proddel);
			const rpta = await articulo.deleteOne( { _id:  new ObjectID(id) } );
			res.status(200).json(rpta);
		} catch (error) {
			console.log(error)
			res.status(500).json(error);
		}
	}

	async import( req: Request, res: Response ){
		try {
			if ( req.body._id ) req.body._id = new ObjectID( req.body._id );
			const newReg = await articulo
			.updateOne({ _id: req.body._id },   // Query parameter
				{ $set: req.body }, 
				{ upsert: true }    // Options
			 );
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', newReg });
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async add( req: Request, res: Response ){
		try {
/*
			const art = await articulo.findOne({ name: req.body.name });
			if (art)
				return res.status(400).json({ msg: 'Registro ya existe', art });
			const newArticulo = new articulo(req.body);
			const rpta = await newArticulo.save();
			return res.status(200).json({ msg: 'Registro creado satisfactoriamente', newArticulo });
		*/
			if ( req.body._id ) req.body._id = new ObjectID( req.body._id );
			const newReg = await articulo.updateOne({ _id: req.body._id },   // Query parameter
			{ $set: req.body }, 
			{ upsert: true }    // Options
	 )
/*
			console.log(req.body)
			const newReg = new articulo(req.body);
			await newReg.save();
*/
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', newReg });

		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async modifica( req: Request, res: Response) {
		try {
			if ( req.body._id ) req.body._id = new ObjectID( req.body._id );
			const rpta = await articulo.updateOne({ _id: req.body._id },   // Query parameter
				{ $set: req.body }, 
				{ upsert: true }    // Options
			);
			return res.status(200).json( rpta );
		} catch (error) {
			console.log(error);
			return res.status(500).json( error );
		}
	}

	async searchArticulos ( req: Request, res: Response ) {
		try {
			const { search } = req.params;
			let Articulo = {};
			if ( search && search.length > 0) {
				Articulo = articuloSanitizeString(search);
/*
				Articulo = {'$and': []};
				const searchItem = search.replace(/  /g, ' ');
				const array: any[] = searchItem.trim().split(' ');
	
				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					const o = [{'name': {$regex: new RegExp( `${element}` , 'i')}},
					{'fabricante': {$regex: new RegExp( `${element}` , 'i')}},
					{'marca': {$regex: new RegExp( `${element}` , 'i')}},
					{'rubro': {$regex: new RegExp( `${element}` , 'i')}},
					{'linea': {$regex: new RegExp( `${element}` , 'i')}}]
					Articulo['$and'].push({'$or': o });
				}
*/
			}
			const qry = { Articulo, Producto:{}, Sort: {'fullName': 1 } }
			const rpta = await readArticulos(qry);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(403).json(error);
		}
	}

	async findArticulos ( req: Request, res: Response ) {
		try {
			const qry = req.body;
			const rpta = await readArticulos(qry);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(403).json(error);
		}
	}

	async searchProductos ( req: Request, res: Response ) {
		try {
			const { search } = req.params;
			let Articulo = {};
			if ( search && search.length > 0) {
				Articulo = articuloSanitizeString(search);
/*
				Articulo = {'$and': []};
				const searchItem = search.replace(/  /g, ' ');
				const array: any[] = searchItem.trim().split(' ');
	
				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					const o = [{'name': {$regex: new RegExp( `${element}` , 'i')}},
					{'fabricante': {$regex: new RegExp( `${element}` , 'i')}},
					{'marca': {$regex: new RegExp( `${element}` , 'i')}},
					{'rubro': {$regex: new RegExp( `${element}` , 'i')}},
					{'linea': {$regex: new RegExp( `${element}` , 'i')}}]
					Articulo['$and'].push({'$or': o });
				}
				Articulo = {'$and': []};
				const searchItem = search.replace(/  /g, ' ');
				const array: any[] = searchItem.trim().split(' ');
	
				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					const o = [{'name': {$regex: new RegExp( `${element}` , 'i')}},
					{'fabricante': {$regex: new RegExp( `${element}` , 'i')}},
					{'marca': {$regex: new RegExp( `${element}` , 'i')}},
					{'rubro': {$regex: new RegExp( `${element}` , 'i')}},
					{'linea': {$regex: new RegExp( `${element}` , 'i')}}]
					Articulo['$and'].push({'$or': o });
				}
			*/
			}
			const qry = { Articulo, Producto:{}, Sort: { 'fabricante': 1, 'marca': 1, 'rubro': 1, 'linea': 1, 'especie': 1, 'edad': 1, 'raza': 1, 'name': 1 } }
			const rpta = await readProductos(qry);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(403).json(error);
		}
	}

	async findProductos ( req: Request, res: Response ) {
		try {
			const qry = req.body;
			console.log(qry);
			const rpta = await readProductos(qry);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(408).json(error);
		}
	}

	async test ( req: Request, res: Response ) {
		try {
			const { search } = req.params;
			let Articulo = {};
			const qry = { Articulo, Producto:{}, Sort: {'fabricante': 1, 'marca': 1, 'rubro': 1, 'linea': 1, 'name': 1 } }
			const array = await readArticulos(qry);
/*
			for (let index = 0; index < array.length; index++) {
				const element = array[index];
				if (element.tags)
					if (Array.isArray(element.tags))
						element.tags = element.tags.toString();
				const filter = { _id: new ObjectID(element._id) };
				const rpta = await articulo.updateOne( filter, { $set :  element  }, { upsert: true });
				console.log(rpta);
			}
*/
			res.status(200).json(array);
		} catch (error) {
			console.log(error);
			res.status(403).json(error);
		}
	}

/*
	async list(req: Request, res: Response) {
		try {
			const rpta = await readArticulos({ Articulo: {}, Sort: { fullName: 1 } });
			res.status(200).json(rpta);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async productosList(req: Request, res: Response) {
		try {
			const qry = (req.body ? req.body : {Articulo:{},Producto:{}} );
			console.log(qry);
			for (const key in qry.Articulo) {
				if (Object.prototype.hasOwnProperty.call(qry.Articulo, key)) {
					const element = qry.Articulo[key];
					if(element['$regex']){
						qry.Articulo[key]['$regex'] = new RegExp(qry.Articulo[key]['$regex'],'i')
					}
				}
			}
			for (const key in qry.Producto) {
				if (Object.prototype.hasOwnProperty.call(qry.Producto, key)) {
					const element = qry.Producto[key];
					if(element['$regex']){
						qry.Producto[key]['$regex'] = new RegExp(qry.Producto[key]['$regex'],'i')
					}
				}
			}
//			const rpta = await readProductos(qry);
			const rpta = await articulo.aggregate([
				{$match: {}},
				{$sort: {fabricante: 1, marca: 1, name: 1, }}
			]);
      for ( let index = 0; index < rpta.length; index++ ) {
				let fullName = '';
				const a = rpta[index];
				if (a.d_fabricante) { fullName += a.fabricante; }
				if (a.d_marca) { fullName += ` ${a.marca}`; }
				if (a.d_rubro) { fullName += ` ${a.rubro}`; }
				if (a.d_linea) { fullName += ` ${a.linea}`; }
				a.fullName = `${fullName} ${a.name}`;
				a.fullName.replace(/  /g, ' ');
			}

			res.status(200).json(rpta);

		} catch (error) {
			res.status(404).json(error);
		}
	}

	async buscar ( req: Request, res: Response ) {
		try {
			const { search } = req.params;
			const qry = { "name": { $regex: new RegExp( search , 'i') } };
			const rpta = await articulo.find(qry).sort({ fabricante: 1, marca: 1, name: 1, rubro: 1, linea: 1 });
			res.status(200).json(rpta);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async listado( req: Request, res: Response){
		try {
			const rpta = await readArticulos(req.body);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(403).json(error);
		}
	}
	async getFull( req: Request, res: Response){
		try {
			const rpta:IArticulo[] = await articulo.find().sort({name: 1});
			let ret = [];
			for (let i = 0; i < rpta.length; i++) {
				const e:any = rpta[i];
				const prod = { productos: await producto.find({articulo: e._id}).sort({name: 1,contiene:1})}
				ret[i] = Object.assign( {} ,e._doc,prod);
			}
			res.status(200).json(ret);
		} catch (error) {
			res.status(500).json(error);
		}
	}
*/
}
export const articuloCtrl = new ArticuloControler();