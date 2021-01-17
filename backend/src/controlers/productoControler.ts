import { Request, Response, Router } from 'express';
import producto, { IProducto } from '../models/producto';
import { ObjectID } from 'bson'
import articulos from '../models/articulos'
import { readProductos } from './articuloControler';
import { qryProductosProcess, readParent } from '../common/productosCommon';
import { decimales, round } from '../common/utils';

/*
	aggregate([
		{ $match: qry }
		,
			{
				 $lookup: {
						from: "articulos",
						localField: "articulo",    // field in the orders collection
						foreignField: "_id",  // field in the items collection
						as: "fromItems"
				 }
			},
			{
				 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
			},
			{ $project: { fromItems: 0 } }

	]).sort({name: 1})

		db.articulos.aggregate([
			{
				 $lookup: {
						from: "productos",
						pipeline: [
							{ $match: { precio: { $gt: 0 }}}
						],
						localField: "_id",
						foreignField: "articulo",
						as: "productos"
				 }
			}
		])

		db.productos.aggregate([
			{ $match: { precio: { $gt: 0 }}},
			{
				 $lookup: {
						from: "articulos",
						localField: "articulo",
						foreignField: "_id",
						as: "articulo"
				 }
			}
		])
	*/



class ProductoControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config() {
		this.router.get('/articulo/:id/productos', this.listado);
		this.router.delete('/articulo/:id/productos', this.deleteMany);
		this.router.put('/articulo/:id/productos', this.update);

		this.router.get('/productos/list', this.list);
		this.router.post('/productos/list', this.list);
		this.router.post('/productos/buscar', this.buscar)
		this.router.post('/productos/imany', this.insertMany);
		this.router.get('/producto/:id', this.get);
		this.router.delete('/producto/:id', this.delete);
		this.router.post('/producto', this.add);
		this.router.post('/productos', this.update);
		this.router.put('/producto/:id', this.put);
		this.router.get('/productos/search/:search', this.search);
		this.router.get('/productos/test', this.test);
	}

	public index(req: Request, res: Response) {
		res.send('Productos');
	}
	async list(req: Request, res: Response) {
		let qry = req.body;
		let myMatch: any;
		let artList: any[] = [];
//		console.log("body",qry)
		qry = qryProductosProcess(qry);
/*
		console.log("qry1",qry);
		console.log("qry1.Extra",qry.Extra)
*/
		if (qry.Articulo['$and'] && qry.Articulo['$and'].length == 1) {
			myMatch = {
				'$or': [
					{ 'codigo': qry.Articulo['$and'][0]['name']['$regex'] }
					, { 'plu': { '$eq': qry.Articulo['$and'][0]['name']['$regex'] } }
				]
			}
//			console.log('myMatch', myMatch)
			artList = await producto.find(myMatch);
//			console.log('artList', artList)
		}

		if (myMatch == undefined || artList.length == 0) {
			artList = await articulos.find(qry.Articulo)
			for (let index = 0; index < artList.length; index++) {
				artList[index] = new ObjectID(artList[index]._id);
			}
			qry.Producto['articulo'] = { '$in': artList }
//			console.log('myMatch',myMatch);
		}

/*
		console.log(qry)
		console.log("articulo", qry.Articulo)
		console.log("articulo.$and", qry.Articulo['$and'])
		console.log("Producto", qry.Producto)
		console.log("Extra", qry.Extra)
*/
//		console.log("Producto.$or", qry.Producto['$or'])
//		const pesable = (qry.Producto.pesable ? { 'pesable': qry.Producto.pesable } : {})
		//		const or = qry.Producto['$or']
		//		delete qry.Producto['$or'];
		//		delete qry.Producto.pesable;

		//		qry = {Producto: {}, Extra: {}}
		const readData = await producto.aggregate([
			{ $match: qry.Producto }
			,{
				$addFields:
				{
					total: { $multiply: ["$stock", "$contiene"] }
				}
			}
			,{
				$group:
				{
					_id: "$articulo",
					product: { $push: "$$ROOT" },
				}
			}
			,{
				$addFields:
				{
					totalStock: { $sum: '$total' }
				}
			}
			,{
				$project: {
					'product': 1
					, '_id': 1
					, 'sumaTotal': { $sum: '$product.total' }
				}
			}
			,{
				$unwind: "$product"
			}
			,{
				$lookup: {
					from: "articulos",
					localField: "_id",
					foreignField: "_id",
					as: "articulo"
				}
			}
			,{
				$unwind: "$articulo"
			}
			,{
				$project:
				{
					"_id": '$product._id'
					, 'art_name': '$articulo.name'
					, 'url': '$articulo.url'
					, 'art_image': '$articulo.image'
					, 'articulo': '$articulo._id'
					, 'art_iva': '$articulo.iva'
					, "parent": '$product.parent'
					, "name": '$product.name'
					, 'contiene': '$product.contiene'
					, 'unidad': '$product.unidad'
					, 'compra': '$product.compra'
					, 'reposicion': '$product.reposicion'
					, 'margen': '$product.margen'
					, 'precio': '$product.precio'
					, 'pesable': '$product.pesable'
					, 'pVenta': '$product.pVenta'
					, 'pCompra': '$product.pCompra'
					, 'pServicio': '$product.pServicio'
					, 'codigo': '$product.codigo'
					, 'plu': '$product.plu'
					, "image": '$product.image'
					, "stock": '$product.stock'
					, 'total': '$product.total'
					, 'sumaTotal': 1
				}
			}
			,{
				$match: qry.Extra
			}
			,{
				$sort: {
					'art_name': 1, 'precio': 1, 'name': 1, 'contiene': 1
				}
			}

		])
		let cnt = 0;
		for (let i = 0; i < readData.length; i++) {
			let e = readData[i];
//			console.log(e.parent,e._id)
			if (e.parent == undefined) e.parent = null; 
			if (`${e.parent}` == `${e._id}`) {
				cnt+=1;
				e.parent = null
				console.log(cnt, e)
			}
			e.fullName = readParent(readData, e._id, e.art_name)
			e.image = (e.image ? e.image : e.art_image)
			if (e.pesable == true) {
				if (e.parent){
					const p = <IProducto>await producto.findById(e.parent);
					if(e.margen == undefined || e.margen == 0) e.margen = 45;
					const pmargen = (100+e.margen)/100
					if (p.compra == undefined || p.compra == null|| p.compra == 0) p.compra = round(p.precio/pmargen,decimales)
					if (p.reposicion == undefined || p.reposicion == null || p.reposicion == 0) p.reposicion = p.compra;//round(p.compra*1.12,decimales)

					e.compra = round(p.compra/p.contiene,decimales);
					e.reposicion = round(p.reposicion/p.contiene,decimales);
					e.promedio = round( ((p.compra+p.reposicion)/2)/p.contiene,decimales)
				}
				if (!e.stock || e.stock == null || e.stock == 0) {
					e.stock = e.sumaTotal;
				}
			}

			if (e.margen == undefined || e.margen == null || e.margen == 0) e.margen = (e.pesable ? 45 : 35);
      const cmargen = round((100+e.margen)/100,decimales)
      if (e.compra == undefined || e.compra == null || e.compra == 0 ) e.compra = round(e.precio / cmargen,decimales);
      if (e.reposicion == undefined || e.reposicion == null || e.reposicion == 0 ) e.reposicion = e.compra; //round(e.compra * 1.12,decimales);
			e.promedio = round((e.compra+e.reposicion)/2,decimales) 
			e.uprecio = round(e.precio/e.contiene,decimales)
		}
		res.status(200).json(readData)
	}

	async test(req: Request, res: Response) {
		let qry = req.body;
		let myMatch: any;
		let artList: any[] = [];
//		console.log("body",qry)
		qry = qryProductosProcess(qry);
/*
		console.log("qry1",qry);
		console.log("qry1.Extra",qry.Extra)
*/
		if (qry.Articulo['$and'] && qry.Articulo['$and'].length == 1) {
			myMatch = {
				'$or': [
					{ 'codigo': qry.Articulo['$and'][0]['name']['$regex'] }
					, { 'plu': { '$eq': qry.Articulo['$and'][0]['name']['$regex'] } }
				]
			}
//			console.log('myMatch', myMatch)
			artList = await producto.find(myMatch);
//			console.log('artList', artList)
		}

		if (myMatch == undefined || artList.length == 0) {
			artList = await articulos.find(qry.Articulo)
			for (let index = 0; index < artList.length; index++) {
				artList[index] = new ObjectID(artList[index]._id);
			}
			qry.Producto['articulo'] = { '$in': artList }
//			console.log('myMatch',myMatch);
		}

/*
		console.log(qry)
		console.log("articulo", qry.Articulo)
		console.log("articulo.$and", qry.Articulo['$and'])
		console.log("Producto", qry.Producto)
		console.log("Extra", qry.Extra)
*/
//		console.log("Producto.$or", qry.Producto['$or'])
//		const pesable = (qry.Producto.pesable ? { 'pesable': qry.Producto.pesable } : {})
		//		const or = qry.Producto['$or']
		//		delete qry.Producto['$or'];
		//		delete qry.Producto.pesable;

		//		qry = {Producto: {}, Extra: {}}

		const readData = await producto.aggregate([
			{ $match: qry.Producto }
			,{
				$addFields:
				{
					total: { $multiply: ["$stock", "$contiene"] }
				}
			}
			,{
				$group:
				{
					_id: "$articulo",
					product: { $push: "$$ROOT" },
				}
			}
			,{
				$addFields:
				{
					totalStock: { $sum: '$total' }
				}
			}
			,{
				$project: {
					'product': 1
					, '_id': 1
					, 'sumaTotal': { $sum: '$product.total' }
				}
			}
			,{
				$unwind: "$product"
			}
			,{
				$lookup: {
					from: "articulos",
					localField: "_id",
					foreignField: "_id",
					as: "articulo"
				}
			}
			,{
				$unwind: "$articulo"
			}
			,{
				$project:
				{
					"_id": '$product._id'
					, 'art_name': '$articulo.name'
					, 'url': '$articulo.url'
					, 'art_image': '$articulo.image'
					, 'articulo': '$articulo._id'
					, 'art_iva': '$articulo.iva'
					, "parent": '$product.parent'
					, "name": '$product.name'
					, 'contiene': '$product.contiene'
					, 'unidad': '$product.unidad'
					, 'compra': '$product.compra'
					, 'reposicion': '$product.reposicion'
					, 'margen': '$product.margen'
					, 'precio': '$product.precio'
					, 'pesable': '$product.pesable'
					, 'pVenta': '$product.pVenta'
					, 'pCompra': '$product.pCompra'
					, 'pServicio': '$product.pServicio'
					, 'codigo': '$product.codigo'
					, 'plu': '$product.plu'
					, "image": '$product.image'
					, "stock": '$product.stock'
					, 'total': '$product.total'
					, 'sumaTotal': 1
				}
			}
			,{
				$match: qry.Extra
			}
			,{
				$sort: {
					'art_name': 1, 'precio': 1, 'name': 1, 'contiene': 1
				}
			}

		])
		let cnt = 0;
		for (let i = 0; i < readData.length; i++) {
			let e = readData[i];
//			console.log(e.parent,e._id)
			if (e.parent == undefined) e.parent = null; 
			if (`${e.parent}` == `${e._id}`) {
				cnt+=1;
				e.parent = null
				console.log(cnt, e)
			}
			e.fullName = readParent(readData, e._id, e.art_name)
			e.image = (e.image ? e.image : e.art_image)
			if (e.pesable == true) {
				if (e.parent){
					const p = <IProducto>await producto.findById(e.parent);
					if(e.margen == undefined || e.margen == 0) e.margen = 45;
					const pmargen = (100+e.margen)/100
					if (p.compra == undefined || p.compra == null|| p.compra == 0) p.compra = round(p.precio/pmargen,decimales)
					if (p.reposicion == undefined || p.reposicion == null || p.reposicion == 0) p.reposicion = p.compra;//round(p.compra*1.12,decimales)

					e.compra = round(p.compra/p.contiene,decimales);
					e.reposicion = round(p.reposicion/p.contiene,decimales);
					e.promedio = round( ((p.compra+p.reposicion)/2)/p.contiene,decimales)
				}
				if (!e.stock || e.stock == null || e.stock == 0) {
					e.stock = e.sumaTotal;
				}
			}

			if (e.margen == undefined || e.margen == null || e.margen == 0) e.margen = (e.pesable ? 45 : 35);
      const cmargen = round((100+e.margen)/100,decimales)
      if (e.compra == undefined || e.compra == null || e.compra == 0 ) e.compra = round(e.precio / cmargen,decimales);
      if (e.reposicion == undefined || e.reposicion == null || e.reposicion == 0 ) e.reposicion = e.compra; //round(e.compra * 1.12,decimales);
			e.promedio = round((e.compra+e.reposicion)/2,decimales) 
			e.uprecio = round(e.precio/e.contiene,decimales)
		}
		res.status(200).json(readData)
	}

	async listado(req: Request, res: Response) {
		const { id } = req.params
		const list = await producto.find({ articulo: new ObjectID(id) });
		res.json(list);
	}

	async get(req: Request, res: Response) {
		try {
			const { id } = req.params
			const rpta = await producto.findById(id);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(404).json(error);
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		producto.findByIdAndDelete(id).then(rpta => {
			res.status(200).json(rpta);
		}).catch(err => {
			console.log(err);
			res.status(500).json(err);
		})
	}

	async deleteMany(req: Request, res: Response) {
		const id = new ObjectID(req.params.id);
		producto.deleteMany({ "articulo": id })
			.then(rpta => {
				res.status(200).json(rpta);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err);
			})
	}
	async update(req: Request, res: Response) {
		const id = new ObjectID(req.body[0].articulo);
		producto.deleteMany({ "articulo": id })
			.then(rpta => {
				producto.insertMany(req.body)
					.then(rta => {
						return res.status(200).json(rta);
					})
					.catch(err => {
						return res.status(500).json(err);
					})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json(err);
			})
	}

	async insertMany(req: Request, res: Response) {
		try {
			const rpta = await producto.insertMany(req.body);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async add(req: Request, res: Response) {
		try {
			const reg = await producto.findOne({ name: req.body.name });
			if (reg)
				return res.status(400).json({ msg: 'Registro ya existe', reg });
			const newReg = new producto(req.body);
			await newReg.save();
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', newReg });
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async put(req: Request, res: Response) {
		const { id } = req.params;
		try {
			console.log(req.body)
			const ret = await producto.findOneAndUpdate({ _id: id }, { $set: req.body });
			res.status(200).json({ msg: "Update Ok", old: ret, new: req.body });
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async search(req: Request, res: Response) {
		try {
			const { search } = req.params
			const qry = { "name": { $regex: new RegExp(search, 'i') } }
			const rpta = await producto.find(qry).sort({ name: 1 })
			res.status(200).json(rpta);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async buscar(req: Request, res: Response) {
		try {
			const qry = (req.body ? req.body : { Articulo: {}, Producto: {} });
			for (const key in qry.Articulo) {
				if (Object.prototype.hasOwnProperty.call(qry.Articulo, key)) {
					const array: any[] = qry.Articulo[key];
					if (key == '$and' || key == '$or') {
						for (let i = 0; i < array.length; i++) {
							for (const id in array[i]) {
								const element: any = array[i][id];
								if (element['$regex']) {
									qry.Articulo[key][i][id] = { $regex: new RegExp(element['$regex'], element['mod']) }
								}
							}
							console.log(qry.Articulo[key])
						}
					} else {
						const element = qry.Articulo[key];
						if (element['$regex']) {
							qry.Articulo[key]['$regex'] = new RegExp(qry.Articulo[key]['$regex'], 'i')
						}
						if (element['$in']) {
							if (element['$in']['$regExp']) {
								let array = element['$in']['$regExp']
								for (let index = 0; index < array.length; index++) {
									array[index] = new RegExp(`^${array[index]}`, 'i');
									console.log(array[index])
								}
								qry.Articulo[key]['$in'] = array
							}
						}
					}
				}
			}
			for (const key in qry.Producto) {
				if (Object.prototype.hasOwnProperty.call(qry.Producto, key)) {
					const element = qry.Producto[key];
					if (element['$regex']) {
						qry.Producto[key]['$regex'] = new RegExp(qry.Producto[key]['$regex'], 'i')
					}
				}
			}
			console.log(qry)
			const rpta: any = await readProductos(qry);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(404).json(error);
		}
	}

	getFullName (item:any, descr?: string): string {
		if (!descr) descr = "";
		if (item._id) {
			if (item.contiene)
				descr += (item.unidad ? ` ${item.name} ${item.contiene} ${item.unidad}` : ` ${item.name} ${item.contiene}`)
			else if (item.unidad) descr += ` ${item.name} ${item.unidad}`
			else descr += ` ${item.name}`
			if (item.parent) {
				const p = producto.find({ _id: item.parent })
				descr = this.getFullName( p, descr );
			}
		}
		return descr.trim();
	}
}

export const productoCtrl = new ProductoControler();
/*
db.productos.find().populate([
	{
		 $lookup: {
				from: "articulos",
				localField: "articulo",    // field in the orders collection
				foreignField: "_id",  // field in the items collection
				as: "fromItems"
		 }
	},
	{
		 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
	},
	{ $project: { fromItems: 0 } }
])
*/