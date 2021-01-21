import { Request, Response, Router } from 'express';
import producto, { IProducto } from '../models/producto';
import { ObjectID } from 'bson'
import articulos from '../models/articulos'
import { articuloCtrl, articuloSanitizeString, readArticulos, readProductos } from './articuloControler';
import { qryProductosProcess, readParent } from '../common/productosCommon';
import { decimales, round } from '../common/utils';


export const productoGetData = async function( qry: any ): Promise<IProducto[]> {
	if( !qry.Producto ) qry.Producto = {};
	if( !qry.Articulo ) qry.Articulo = {};
	if( !qry.Extra ) qry.Extra = {};
	if( !qry.Sort ) qry.Sort = {};

	return await producto.aggregate([
		{ $match: qry.Producto },
		{
			$lookup: {
				from: "articulos",
				localField: "articulo",
				foreignField: "_id",
				as: "art"
			}
		},
		{
			$unwind: "$art"
		},
		{
			$project: {
				"_id": 1,
				"parent": 1,
				"name": 1,
				"contiene": 1,
				"unidad": 1,
				"precio": 1,
				"compra": 1,
				"reposicion": 1,
				"pesable": 1,
				"servicio": 1,
				"pVenta": 1,
				"pCompra": 1,
				"codigo": 1,
				"plu": 1,
				"image": 1,
				"stock": 1,
				"stockMin": 1,
				"iva": 1,
				"margen": 1,
				"articuloId": "$articulo",
				'art_name': {
					$cond: ['$art.d_fabricante',
						//true fabicante
						{
							$cond: ['$art.d_marca',
								//true fabicante true marca
								{
									$cond: ['$art.d_rubro',
										// true fabicante true marca true rubro
										{
											$cond: ['$art.d_linea',
												// true fabicante true marca true rubro true lineea
												{
													$concat: [
														//'true fabicante true marca true rubro true lineea ',
														'$art.fabricante', ' ', '$art.marca', ' ', '$art.rubro', ' ', '$art.linea', ' ', '$art.name']
												}
												,
												{
													$concat: [
														//'true fabicante true marca true rubro true lineea ',
														'$art.fabricante', ' ', '$art.marca', ' ', '$art.rubro', ' ', '$art.name']
												}
											]
										}
										,
										// true fabicante true marca false rubro
										{
											$cond: ['$art.d_linea',
												// true fabicante true marca false rubro true lineea
												{
													$concat: [
														//'true fabicante true marca false rubro true lineea ',
														'$art.fabricante', ' ', '$art.marca', ' ', '$art.linea', ' ', '$art.name']
												}
												,
												{
													$concat: [
														//'true fabicante true marca false false linea ',
														'$art.fabricante', ' ', '$art.marca', ' ', '$art.name']
												}
											]
										}
									]
								}
								,
								//true fabicante false marca
								{
									$cond: ['$art.d_rubro',
										// true fabicante false marca true rubro
										{
											$cond: ['$art.d_linea',
												// true fabicante false marca true rubro true linea
												{
													$concat: [
														//'true fabicante false marca true rubro true linea',
														'$art.fabricante', ' ', '$art.rubro', ' ', '$art.linea', ' ', '$art.name']
												}
												,
												{
													$concat: [
														//'true fabicante false marca true rubro false linea',
														'$art.fabricante', ' ', '$art.rubro', ' ', '$art.name']
												}
											]
										}
										,
										// true fabicante false marca false rubro
										{
											$cond: ['$art.d_linea',
												// true fabicante false marca false rubro true lineea
												{
													$concat: [
														//'true fabicante false marca false rubro true linea',
														'$art.fabricante', ' ', '$art.linea', ' ', '$art.name']
												}
												,
												{
													$concat: [
														//'true fabicante false marca false rubro false linea',
														'$art.fabricante', ' ', '$art.name']
												}
											]
										}
									]
								}
							]
						},
						// false fabricante
						{
							$cond: ['$art.d_marca',
								//false fabicante true marca
								{
									$cond: ['$art.d_rubro',
										// false fabicante true marca true rubro
										{
											$cond: ['$art.d_linea',
												// false fabicante true marca true rubro true lineea
												{
													$concat: [
														//'false fabicante true marca true rubro true linea',
														'$art.marca', ' ', '$art.rubro', ' ', '$art.linea', ' ', '$art.name']
												}
												,
												{
													$concat: [
														//'false fabicante true marca true rubro false linea',
														'$art.marca', ' ', '$art.rubro', ' ', '$art.name']
												}
											]
										}
										,
										//false fabicante true marca false rubro
										{
											$cond: ['$art.d_linea',
												//false fabicante true marca false rubro true lineea
												{
													$concat: [
														//'false fabicante true marca false rubro true linea',
														'$art.marca', ' ', '$art.linea', ' ', '$art.name']
												}
												,
												{
													$concat: [
														//'false fabicante true marca false rubro false linea',
														'$art.marca', ' ', '$art.name']
												}
											]
										}
									]
								}
								,
								//false fabicante false marca
								{
									$cond: ['$art.d_rubro',
										//false fabicante false marca true rubro
										{
											$cond: ['$art.d_linea',
												//false fabicante false marca true rubro true lineea
												{
													$concat: [
														//'false fabicante false marca true rubro true linea', 
														'$art.rubro', ' ', '$art.linea', ' ', '$art.name']
												}
												,
												{
													$concat: [
														//'false fabicante false marca true rubro false linea', 
														'$art.rubro', ' ',
														'$art.name']
												}
											]
										}
										,
										//false fabicante false marca false rubro
										{
											$cond: ['$art.d_linea',
												// true fabicante false marca false rubro true lineea
												{
													$concat: [
														//'false fabicante false marca false rubro true linea',
														'$art.linea', ' ',
														'$art.name']
												}
												,
												{
													$concat: [
														//'false fabicante false marca false rubro false linea',
														'$art.name'
													]
												}
											]
										}
									]
								}
							]
						},
					]
				},
				'url': '$art.url',
				'art_image': '$art.image',
				'art_iva': '$art.iva',
				'fabricante': '$art.fabricante',
				'marca': '$art.marca',
				'rubro': '$art.rubro',
				'linea': '$art.linea',
				'd_fabricante': '$art.d_fabricante',
				'd_marca': '$art.d_marca',
				'd_rubro': '$art.d_rubro',
				'd_linea': '$art.d_linea',
				'tags': '$art.tags',
				'art_margen': '$art.margen',
				'private_web': '$art.private_web',
				'tipo': {
					$cond: ['$parent', 
						// Tine parent 
						1, 
						0
					]
				}
			}
		},
		{
      $lookup:
         {
           from: "productos",
           let: { productoId: "$parent", pesable: "$pesable", pVenta: "$pVenta", pCompra: "$pCompra", pServicio: "$pServicio" },
           pipeline: [
							{ $match:
                 { $expr:
                    { $and:
                       [
												 { $eq: [ "$_id",  "$$productoId" ] },
												 // Esto nos asegura que es un producto que se vende
												 // fraccionando
                         { $eq: [ "$$pVenta", true ] },
                         { $eq: [ "$$pCompra", true ] },
 //                        { $eq: [ "$$pServicio", false ] },
                         { $eq: [ "$$pesable", false ] },

//												 { $eq: [ "$pVenta", true ] },
//                         { $eq: [ "$pCompra", true ] },
//                         { $eq: [ "$pesable", false ] }
                       ]
                    }
                 }
							},

							{
								$project: { name: 1, contiene: 1, unidad: 1, _id: 0 } 
							}

           ],
           as: "in"
         }
		},
		{
      $lookup:
         {
           from: "productos",
           let: { productoId: "$parent", pesable: "$pesable", pVenta: "$pVenta", pCompra: "$pCompra", pServicio: "$pServicio" },
           pipeline: [
							{ $match:
                 { $expr:
                    { $and:
                       [
												 { $eq: [ "$_id",  "$$productoId" ] },
												 // Esto nos asegura que es un producto que se vende
												 // fraccionando
                         { $eq: [ "$$pVenta", true ] },
                         { $eq: [ "$$pCompra", false ] },
 //                        { $eq: [ "$$pServicio", false ] },
                         { $eq: [ "$$pesable", true ] },

												 { $eq: [ "$pVenta", true ] },
                         { $eq: [ "$pCompra", true ] },
                         { $eq: [ "$pesable", false ] }
                       ]
                    }
                 }
							},

							{
								$project: { name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, _id: 0 } 
							}

           ],
           as: "de"
         }
		},
		{
      $lookup:
         {
           from: "productos",
           let: { productoId: "$_id", pesable: "$pesable", pVenta: "$pVenta", pCompra: "$pCompra", pServicio: "$pServicio" },
           pipeline: [
							{ $match:
                 { $expr:
                    { $and:
                       [
												 { $eq: [ "$parent",  "$$productoId" ] },
												 // esto asegura que es un producto de venta que no se compra 
												 // y se incluye dentro de este pack no se fracciona
                         { $eq: [ "$$pVenta", true ] },
                         { $eq: [ "$$pCompra", false ] },
//                         { $eq: [ "$$pServicio", false ] },
                         { $eq: [ "$$pesable", false ] },
												 // no es necesario
                         { $eq: [ "$pVenta", true ] },
                         { $eq: [ "$pCompra", true ] },
                         { $eq: [ "$pesable", false ] }
                       ]
                    }
                 }
							},

							{
								$project: { name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, _id: 0 } 
							}

           ],
           as: "en"
         }
		},
		{
			$unwind: {
				path: '$de',
				includeArrayIndex: 'de_count',
				preserveNullAndEmptyArrays: true
			}				
		},
		{
			$unwind: {
				path: '$en',
				includeArrayIndex: 'en_count',
				preserveNullAndEmptyArrays: true
			}				
		},
		{
			$project: {
				"_id": 1,
//				"parent": "5fe202e8bab06d6b24059993",
				"name": 1,
				"contiene": 1,
				"unidad": 1,
				"precio": { $cond: [ {$eq: ['$de_count', 0]}, 
									{ $divide: ['$de.precio', '$de.contiene']}, 
									{ $cond: [ {$eq:[ '$en_count', 0 ]}, 
										{ $divide: ['$en.precio', '$en.contiene']}, 
										'$precio' ]
									} ]
								},
				"compra": { $cond: [ {$eq: ['$de_count', 0]}, 
									{ $divide: ['$de.compra', '$de.contiene']}, 
									{ $cond: [ {$eq:[ '$en_count', 0 ]}, 
										{ $divide: ['$en.compra', '$en.contiene']}, 
										'$reposicion' ]
									} ]
								},
				"reposicion": { $cond: [ {$eq: ['$de_count', 0]}, 
									{ $divide: ['$de.reposicion', '$de.contiene']}, 
									{ $cond: [ {$eq:[ '$en_count', 0 ]}, 
										{ $divide: ['$en.reposicion', '$en.contiene']}, 
										'$reposicion' ]
									} ]
								},

				"pesable": 1,
				"servicio": 1,
				"pVenta": 1,
				"pCompra": 1,
				"codigo": 1,
				"plu": 1,
				"image": 1,
				"stock": { $cond: [ {$eq: ['$de_count', 0]}, 
					{ $multiply: ['$de.stock', '$de.contiene']}, 
					{ $cond: [ {$eq:[ '$en_count', 0 ]}, 
						{ $multiply: ['$en.stock', '$en.contiene']}, 
						'$stock' ]
					}]
				},
				"divisor": { $cond: [ {$eq: ['$de_count', 0]}, 
					'$de.contiene', 
					{ $cond: [ {$eq:[ '$en_count', 0 ]}, 
						'$en.contiene', 
						1 ]
					}]
				},
				"sname": { $cond: [ {$eq: ['$de_count', 0]}, 
							'$de.name', 
							{ $cond: [ {$eq:[ '$en_count', 0 ]}, 
								'$en.name', 
								'' ]
							} ]
						},
				"sunidad": { $cond: [ {$eq: ['$de_count', 0]}, 
					'$de.unidad', 
					{ $cond: [ {$eq:[ '$en_count', 0 ]}, 
						'$en.unidad', 
						'' ]
					} ]
				},
				"stockMin": 1,
				"iva": 1,
				"margen": 1,
				"articuloId": 1,
				"art_name": 1,
				"url": 1,
				"art_image": 1,
				"art_iva": 1,
				"fabricante": 1,
				"marca": 1,
				"rubro": 1,
				"d_marca": 1,
				"tags": 1,
				"art_margen": 1,
				"tipo": 1,
				'in': 1
			}
		},

/*
		{
			$lookup: {
				from: "productos",
				localField: "parent",
				foreignField: "_id",
				as: "prod"
			}
		},
		{
			$unwind: {
				path: '$prod',
				includeArrayIndex: 'pcount',
				preserveNullAndEmptyArrays: true
			}				
		},
*/
/*
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
				, 'art_name': {
					$cond: ['$articulo.d_fabricante',
						//true fabicante
						{
							$cond: ['$articulo.d_marca',
								//true fabicante true marca
								{
									$cond: ['$articulo.d_rubro',
										// true fabicante true marca true rubro
										{
											$cond: ['$articulo.d_linea',
												// true fabicante true marca true rubro true lineea
												{
													$concat: [
														//'true fabicante true marca true rubro true lineea ',
														'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
												}
												,
												{
													$concat: [
														//'true fabicante true marca true rubro true lineea ',
														'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.name']
												}
											]
										}
										,
										// true fabicante true marca false rubro
										{
											$cond: ['$articulo.d_linea',
												// true fabicante true marca false rubro true lineea
												{
													$concat: [
														//'true fabicante true marca false rubro true lineea ',
														'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.linea', ' ', '$articulo.name']
												}
												,
												{
													$concat: [
														//'true fabicante true marca false false linea ',
														'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.name']
												}
											]
										}
									]
								}
								,
								//true fabicante false marca
								{
									$cond: ['$articulo.d_rubro',
										// true fabicante false marca true rubro
										{
											$cond: ['$articulo.d_linea',
												// true fabicante false marca true rubro true linea
												{
													$concat: [
														//'true fabicante false marca true rubro true linea',
														'$articulo.fabricante', ' ', '$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
												}
												,
												{
													$concat: [
														//'true fabicante false marca true rubro false linea',
														'$articulo.fabricante', ' ', '$articulo.rubro', ' ', '$articulo.name']
												}
											]
										}
										,
										// true fabicante false marca false rubro
										{
											$cond: ['$articulo.d_linea',
												// true fabicante false marca false rubro true lineea
												{
													$concat: [
														//'true fabicante false marca false rubro true linea',
														'$articulo.fabricante', ' ', '$articulo.linea', ' ', '$articulo.name']
												}
												,
												{
													$concat: [
														//'true fabicante false marca false rubro false linea',
														'$articulo.fabricante', ' ', '$articulo.name']
												}
											]
										}
									]
								}
							]
						},
						// false fabricante
						{
							$cond: ['$articulo.d_marca',
								//false fabicante true marca
								{
									$cond: ['$articulo.d_rubro',
										// false fabicante true marca true rubro
										{
											$cond: ['$articulo.d_linea',
												// false fabicante true marca true rubro true lineea
												{
													$concat: [
														//'false fabicante true marca true rubro true linea',
														'$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
												}
												,
												{
													$concat: [
														//'false fabicante true marca true rubro false linea',
														'$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.name']
												}
											]
										}
										,
										//false fabicante true marca false rubro
										{
											$cond: ['$articulo.d_linea',
												//false fabicante true marca false rubro true lineea
												{
													$concat: [
														//'false fabicante true marca false rubro true linea',
														'$articulo.marca', ' ', '$articulo.linea', ' ', '$articulo.name']
												}
												,
												{
													$concat: [
														//'false fabicante true marca false rubro false linea',
														'$articulo.marca', ' ', '$articulo.name']
												}
											]
										}
									]
								}
								,
								//false fabicante false marca
								{
									$cond: ['$articulo.d_rubro',
										//false fabicante false marca true rubro
										{
											$cond: ['$articulo.d_linea',
												//false fabicante false marca true rubro true lineea
												{
													$concat: [
														//'false fabicante false marca true rubro true linea', 
														'$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
												}
												,
												{
													$concat: [
														//'false fabicante false marca true rubro false linea', 
														'$articulo.rubro', ' ',
														'$articulo.name']
												}
											]
										}
										,
										//false fabicante false marca false rubro
										{
											$cond: ['$articulo.d_linea',
												// true fabicante false marca false rubro true lineea
												{
													$concat: [
														//'false fabicante false marca false rubro true linea',
														'$articulo.linea', ' ',
														'$articulo.name']
												}
												,
												{
													$concat: [
														//'false fabicante false marca false rubro false linea',
														'$articulo.name'
													]
												}
											]
										}
									]
								}
							]
						},
					]
				}
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
*/
		{
			$match: qry.Extra
		},
		{
			$sort: {
				'art_name': 1, 'precio': 1, 'name': 1, 'contiene': 1
			}
		}

	])

} 
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
		this.router.get('/producto/:id', this.leer );
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
//		const { id } = req.params;
		let qry = req.body;
		let myMatch: any;
		let artList: any[] = [];
//		console.log("body",qry)
//		qry = qryProductosProcess(qry);
/*
		console.log("qry1",qry);
		console.log("qry1.Extra",qry.Extra)
*/
		if (qry.searchItem && qry.searchItem.length == 1){
			myMatch = {
				'$or': [
					{ 'codigo': qry.searchItem },
					{ 'plu': qry.searchItem }
				]
			}
		//			console.log('myMatch', myMatch)
			artList = await producto.find(myMatch);
		//			console.log('artList', artList)

		}
/*
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
*/
		if ((myMatch == undefined || artList.length == 0) && qry.searchItem ) {
			console.log(qry.searchItem)
			const Articulo = articuloSanitizeString(qry.searchItem);

//			artList = await articulos.find(qry.Articulo)
			if (Articulo){
				artList = await readArticulos({ Articulo, Project: {'_id': 1}, Sort: {'_id': 1} });
				for (let index = 0; index < artList.length; index++) {
					artList[index] = new ObjectID(artList[index]._id);
				}
				qry.Producto['articulo'] = { '$in': artList }
	//			console.log('myMatch',myMatch);
			}
		}

//		if( id ) qry.Producto = { _id: id }
		
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
					, 'art_name': {
						$cond: ['$articulo.d_fabricante',
							//true fabicante
							{
								$cond: ['$articulo.d_marca',
									//true fabicante true marca
									{
										$cond: ['$articulo.d_rubro',
											// true fabicante true marca true rubro
											{
												$cond: ['$articulo.d_linea',
													// true fabicante true marca true rubro true lineea
													{
														$concat: [
															//'true fabicante true marca true rubro true lineea ',
															'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
													}
													,
													{
														$concat: [
															//'true fabicante true marca true rubro true lineea ',
															'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.name']
													}
												]
											}
											,
											// true fabicante true marca false rubro
											{
												$cond: ['$articulo.d_linea',
													// true fabicante true marca false rubro true lineea
													{
														$concat: [
															//'true fabicante true marca false rubro true lineea ',
															'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.linea', ' ', '$articulo.name']
													}
													,
													{
														$concat: [
															//'true fabicante true marca false false linea ',
															'$articulo.fabricante', ' ', '$articulo.marca', ' ', '$articulo.name']
													}
												]
											}
										]
									}
									,
									//true fabicante false marca
									{
										$cond: ['$articulo.d_rubro',
											// true fabicante false marca true rubro
											{
												$cond: ['$articulo.d_linea',
													// true fabicante false marca true rubro true linea
													{
														$concat: [
															//'true fabicante false marca true rubro true linea',
															'$articulo.fabricante', ' ', '$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
													}
													,
													{
														$concat: [
															//'true fabicante false marca true rubro false linea',
															'$articulo.fabricante', ' ', '$articulo.rubro', ' ', '$articulo.name']
													}
												]
											}
											,
											// true fabicante false marca false rubro
											{
												$cond: ['$articulo.d_linea',
													// true fabicante false marca false rubro true lineea
													{
														$concat: [
															//'true fabicante false marca false rubro true linea',
															'$articulo.fabricante', ' ', '$articulo.linea', ' ', '$articulo.name']
													}
													,
													{
														$concat: [
															//'true fabicante false marca false rubro false linea',
															'$articulo.fabricante', ' ', '$articulo.name']
													}
												]
											}
										]
									}
								]
							},
							// false fabricante
							{
								$cond: ['$articulo.d_marca',
									//false fabicante true marca
									{
										$cond: ['$articulo.d_rubro',
											// false fabicante true marca true rubro
											{
												$cond: ['$articulo.d_linea',
													// false fabicante true marca true rubro true lineea
													{
														$concat: [
															//'false fabicante true marca true rubro true linea',
															'$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
													}
													,
													{
														$concat: [
															//'false fabicante true marca true rubro false linea',
															'$articulo.marca', ' ', '$articulo.rubro', ' ', '$articulo.name']
													}
												]
											}
											,
											//false fabicante true marca false rubro
											{
												$cond: ['$articulo.d_linea',
													//false fabicante true marca false rubro true lineea
													{
														$concat: [
															//'false fabicante true marca false rubro true linea',
															'$articulo.marca', ' ', '$articulo.linea', ' ', '$articulo.name']
													}
													,
													{
														$concat: [
															//'false fabicante true marca false rubro false linea',
															'$articulo.marca', ' ', '$articulo.name']
													}
												]
											}
										]
									}
									,
									//false fabicante false marca
									{
										$cond: ['$articulo.d_rubro',
											//false fabicante false marca true rubro
											{
												$cond: ['$articulo.d_linea',
													//false fabicante false marca true rubro true lineea
													{
														$concat: [
															//'false fabicante false marca true rubro true linea', 
															'$articulo.rubro', ' ', '$articulo.linea', ' ', '$articulo.name']
													}
													,
													{
														$concat: [
															//'false fabicante false marca true rubro false linea', 
															'$articulo.rubro', ' ',
															'$articulo.name']
													}
												]
											}
											,
											//false fabicante false marca false rubro
											{
												$cond: ['$articulo.d_linea',
													// true fabicante false marca false rubro true lineea
													{
														$concat: [
															//'false fabicante false marca false rubro true linea',
															'$articulo.linea', ' ',
															'$articulo.name']
													}
													,
													{
														$concat: [
															//'false fabicante false marca false rubro false linea',
															'$articulo.name'
														]
													}
												]
											}
										]
									}
								]
							},
						]
					}
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
		const readData = await productoGetData({});
		res.status(200).json(readData)
	}

	async listado(req: Request, res: Response) {
		const { id } = req.params
		const list = await producto.find({ articulo: new ObjectID(id) });
		res.json(list);
	}

	async leer(req: Request, res: Response) {
		try {
			const { id } = req.params
			const rpta = await producto.findById(id).populate();
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