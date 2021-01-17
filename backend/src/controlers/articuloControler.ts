import { Request, Response, Router } from 'express';
import articulo, { IArticulo } from '../models/articulos';
import { ObjectID } from 'bson'
import producto, { IProducto } from '../models/producto';
import passport from "passport";

export const readProductos = function ( qry: any ): PromiseLike<any[]> {
	if (!qry.Articulo) qry.Articulo = {};
	if (!qry.Producto) qry.Producto = {};
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
		}
/*
		,{
			$project:
			{
				"name": 1
				,"image": 1
				,"productos": "$result"
			}
		}
	*/
	]).sort({name: 1})
}	


class ArticuloControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
		this.router.get( '/articulos/list', this.list );
		this.router.get( '/articulos/search/:search', this.buscar )
		this.router.get( '/articulos/full', passport.authenticate('jwt', { session: false }), this.getFull );
		this.router.get( '/articulo/:id', this.get );


		this.router.get( '/articulos/productos/list', passport.authenticate('jwt', { session: false }), this.productosList );
		this.router.post( '/articulos/productos/list', passport.authenticate('jwt', { session: false }), this.productosList );
		this.router.get( '/articulos/productos/search/:search', this.productosBuscar )
		this.router.get( '/articulo/productos/:id', this.getProductos );

//		this.router.get( '/articulo/new', this.new )

		this.router.delete( '/articulo/:id', this.delete );
		this.router.post( '/articulo', this.add );
		this.router.put( '/articulo/:id', this.put );
	}

	public index(req: Request, res: Response) {
		res.send('Articulos');
	}

	async list(req: Request, res: Response) {
		try {
			const rpta = await articulo.find().sort({ fabricante: 1, marca: 1, name: 1, rubro: 1, linea: 1 });
			res.status(200).json(rpta);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async buscar ( req: Request, res: Response ) {
		try {
			const { search } = req.params
			const qry = { "name": { $regex: new RegExp( search , 'i') } };
			const rpta = await articulo.find(qry).sort({ fabricante: 1, marca: 1, name: 1, rubro: 1, linea: 1 });
			res.status(200).json(rpta);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async productosBuscar ( req: Request, res: Response ) {
		try {
			const { search } = req.params;
			const qry = { Articulo: { "name": { $regex: new RegExp( search , 'i') } }, Producto:{} }
			const rpta = await readProductos(qry);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(404).json(error);
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

	async getProductos(req: Request, res: Response) {
		try {
			const qry = {Articulo:{_id: new ObjectID( req.params.id )},Producto:{}};
			const rpta = await readProductos(qry)
			res.status(200).json(rpta[0])
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async get(req: Request, res: Response) {
		try {
			const { id } = req.params
			const rpta = await articulo.findById(id)
			return res.status(200).json(rpta);
		} catch (error) {
			return res.status(404).json( error );			
		}
	}

	async delete( req: Request, res: Response ){
		try {
			const { id } = req.params;
			console.log("Id a borrar", id)
			const proddel = await producto.deleteMany( { 'articulo': new ObjectID(id) } );
			console.log(proddel);
			const rpta = await articulo.deleteOne( { _id: new ObjectID(id) } );
			res.status(200).json(rpta);
		} catch (error) {
			console.log(error)
			res.status(500).json(error);
		}
	}

/*
	async new( req: Request, res: Response ){
		try {
			const art = await articulo.findOne({ name: req.body.name });
			if (art)
				return res.status(200).json({ msg: 'articulo ya existe', art });
			const newArticulo = new articulo(req.body);
			return res.status(200).json({ msg: 'Nuevo Artículo', newArticulo });
		} catch (error) {

		}
	}
*/

	async add( req: Request, res: Response ){
		try {
			const art = await articulo.findOne({ name: req.body.name });
			if (art)
				return res.status(400).json({ msg: 'Registro ya existe', art });
			const newArticulo = new articulo(req.body);
			const rpta = await newArticulo.save();
			return res.status(200).json({ msg: 'Registro creado satisfactoriamente', newArticulo });
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async put( req: Request, res: Response) {
		try {
			const filter = { _id: req.params.id };
			const rpta = await articulo.findOneAndUpdate ( filter, { $set :  req.body  });
			return res.status(200).json( rpta );
		} catch (error) {
			return res.status(500).json( error );
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
/*
	async getFull1( req: Request, res: Response){
		try {
			const rpta:any = await articulo.find().sort({name: 1});
			let ret = []
			for (let i = 0; i < rpta.length; i++) {
				const e:IArticulo = rpta[i];
				let prod:any = await producto.find({articulo: e._id}).sort({name: 1});
				let productos = [];
				for (let n = 0; n < prod.length; n++) {
					const p:IProducto = prod[n];
					productos[n] = { precio: p.precio, fullname: await p.getFullName()};					
				}
				ret[i] = {e, productos };
			}
		
			res.status(200).json(ret);
		} catch (error) {
			res.status(500).json(error);
		}
	}
*/	
}

export const articuloCtrl = new ArticuloControler();