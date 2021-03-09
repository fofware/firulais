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
	if( !qry.Project) qry.Project = { 'noproject': 0}
	if( !qry.Decimales) qry.Decimales = 0;
//	if( !qry.Sort ) qry.Sort = {'fabricante': 1, 'marca': 1, 'especie': 1, 'rubro': 1, 'linea': 1, 'edad': 1, 'raza': 1	};
	if( !qry.Sort ) qry.Sort = { 'rubro': 1, 'linea': 1, 'contiene': 1, 'precio': 1 };
	console.log(qry.Producto);
	console.log(qry.Extra);
	const array = await producto.aggregate([
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
				"strContiene": {$toString: '$contiene'},
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
				"image": {$cond: [ '$image', '$image', '$art.image']},
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
				'fabricante': { $ifNull: [ '$art.fabricante', '' ] },
				'marca': { $ifNull: [ '$art.marca', '' ] },
				'rubro': { $ifNull: [ '$art.rubro', '' ] },
				'linea': { $ifNull: [ '$art.linea', '' ] },
				'especie': { $ifNull: [ '$art.especie', '' ] },
				'edad': { $ifNull: [ '$art.edad', '' ] },
				'raza': { $ifNull: [ '$art.raza', '' ] },
				'd_fabricante': '$art.d_fabricante',
				'd_marca': '$art.d_marca',
				'd_rubro': '$art.d_rubro',
				'd_linea': '$art.d_linea',
				'd_especie': '$art.d_especie',
				'd_raza': '$art.d_raza',
				'd_edad': '$art.d_edad',
				'tags': { $ifNull: [ '$art.tags', '' ] },
				'art_margen': '$art.margen',
				'private_web': { $ifNull: [ '$art.private_web', false ] },
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
								$project: { name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, _id: 0, image: 1, strContiene: {$toString: '$contiene'},
							} 
//								$project: { name: 1, contiene: 1, unidad: 1, _id: 0 } 
							}

           ],
           as: "ins"
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

//												 { $eq: [ "$pVenta", true ] },
//                         { $eq: [ "$pCompra", true ] },
//                         { $eq: [ "$pesable", false ] }
                       ]
                    }
                 }
							},
							{
								$project: { name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, _id: 0, image: 1, strContiene: {$toString: '$contiene'} } 
							}
           ],
           as: "parte"
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
//                         { $eq: [ "$pVenta", true ] },
//                         { $eq: [ "$pCompra", true ] },
//                         { $eq: [ "$pesable", false ] }
                       ]
                    }
                 }
							},

							{
								$project: { name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, _id: 0, image: 1, strContiene: {$toString: '$contiene'} } 
							}
           ],
           as: "cerrado"
         }
		},
		{
			$unwind: {
				path: '$parte',
				includeArrayIndex: 'count_parte',
				preserveNullAndEmptyArrays: true
			}				
		},
		{
			$unwind: {
				path: '$cerrado',
				includeArrayIndex: 'count_cerrado',
				preserveNullAndEmptyArrays: true
			}				
		},
		{
			$unwind: {
				path: '$ins',
				includeArrayIndex: 'count_ins',
				preserveNullAndEmptyArrays: true
			}				
		},
		{
			$project: 
			{
				"_id": 1,
				"name": 1,
				"contiene": 1,
				"strContiene": 1,
				"unidad": 1,
				"compra": {
					$round:[ 
						{ $cond: [ {$eq: ['$count_parte', 0]}, 
								{ $divide: ['$parte.compra', '$parte.contiene']}, 
								{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
									{ $divide: ['$cerrado.compra', '$cerrado.contiene']},
									'$compra'
								]}
							]}
						,
						qry.Decimales
					]
				},
				"reposicion": {
					$round: [
						{
							$cond: [ {$eq: ['$count_parte', 0]}, 
							{ $divide: ['$parte.reposicion', '$parte.contiene']}, 
							{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
								{ $divide: ['$cerrado.reposicion', '$cerrado.contiene']}, 
								'$reposicion' 
							]}
						]
	
						}
						, qry.Decimales
					]
				},
				"promedio": 
				{
					$round: [
						{ $cond: [ {$eq: ['$count_parte', 0 ] }, 
							{ $divide: [ { $divide: [ { $add: ['$parte.reposicion','$parte.compra'] }, 2 ] } , '$parte.contiene']}, 
							{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
								{ $divide: [ { $divide: [ { $add: ['$cerrado.reposicion','$cerrado.compra'] }, 2 ] }, '$cerrado.contiene']}, 
								{ $divide: [ { $add: ['$reposicion','$compra'] } , 2 ] } 
							]}
						]}
					, qry.Decimales
					] 
				},
				"precio": { $round: [
					{ 
						$cond: [ {$eq: ['$count_parte', 0]}, 
							{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$parte.compra', '$parte.contiene'] } ] }, 
							{ $cond: 
								[ {$eq:[ '$count_cerrado', 0 ]}, 
								{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$cerrado.compra', '$cerrado.contiene'] } ] }, 
								{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, '$compra' ] }
								]
							}]
					},
					qry.Decimales
				]},
				"precioref": { $round: [
					{ 
						$cond: [ {$eq: ['$count_parte', 0]}, 
							{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$parte.compra', '$parte.contiene' ] } ] } , 
							{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
									{ $divide: [{ $multiply:[ {$add: [ '$margen', 100 ] },0.01,'$cerrado.compra'] }, { $cond: [ {$eq: ['$cerrado.contiene', 0]},1 ,{ $multiply: ['$cerrado.contiene','$contiene']}]} ] },
									{ $cond: [{$eq:['$count_ins', 0]},
										{ $divide: [{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, '$compra' ] }, { $cond: [ {$eq: ['$ins.contiene', 0]},'$contiene',{ $multiply: ['$contiene','$ins.contiene']}]} ] },
										{ $divide: [{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, '$compra' ] }, { $cond: [ {$eq: ['$contiene', 0]},1,'$contiene']} ] } 
									]}
								]}
							]
					},
					{ $cond: [
						{$lt:[
							{ 
								$cond: [ {$eq: ['$count_parte', 0]}, 
								{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$parte.compra', '$parte.contiene' ] } ] } , 
								{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
										{ $divide: [{ $multiply:[ {$add: [ '$margen', 100 ] },0.01,'$cerrado.compra'] }, { $cond: [ {$eq: ['$cerrado.contiene', 0]},1 ,{ $multiply: ['$cerrado.contiene','$contiene']}]} ] },
										{ $cond: [{$eq:['$count_ins', 0]},
											{ $divide: [{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, '$compra' ] }, { $cond: [ {$eq: ['$ins.contiene', 0]},'$contiene',{ $multiply: ['$contiene','$ins.contiene']}]} ] },
											{ $divide: [{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, '$compra' ] }, { $cond: [ {$eq: ['$contiene', 0]},1,'$contiene']} ] } 
										]}
									]}
								]
							}, 1 ]}, 
							2,
							qry.Decimales

					]}
				]},
				'sub': { 
					$cond: [ {$eq: ['$count_ins',0]},
						'$ins',
						{$cond: [{$eq: ['$count_parte',0]},
							'$parte',
							{$cond: [{$eq: ['$count_cerrado',0]},
								'$cerrado',
								{}
							]}
						]}
					]
				},
				"pesable": 1,
				"servicio": 1,
				"pVenta": 1,
				"pCompra": 1,
				"codigo": 1,
				"plu": 1,
				"image": {$cond:[{$eq:[{ $strLenBytes: "$image" },0]},'$art_image','$image']},
				"stock": { $cond: [ {$eq: ['$count_parte', 0]}, 
					{ $multiply: ['$parte.stock', '$parte.contiene']}, 
					{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
						{ $multiply: ['$cerrado.stock', '$cerrado.contiene']}, 
						{ $cond: [ {$eq: ['$ins_count',0]},
							'$stock', 
							'$stock' ] }
						]}
					]
				},
				"divisor": { $cond: [ {$eq: ['$count_parte', 0]}, 
					'$parte.contiene', 
					{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
						'$cerrado.contiene', 
						{ $cond: [ {$eq: ['$ins_count',0]},
							'$ins.contiene',
							'' ] }
						]}
					]
				},

				"scontiene": { $cond: [ {$eq: ['$count_parte', 0]}, 
					'', 
					{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
						'', 
						{ $cond: [ {$eq: ['$count_ins',0]},
							'$ins.contiene',
							'' ] }
						]}
					]
				},

				"sname": { $cond: [ {$eq: ['$count_parte', 0]}, 
					'', 
					{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
						'', 
						{ $cond: [ {$eq: ['$count_ins',0]},
							'$ins.name',
							'' ] }
						]}
					]
				},
				"sunidad": { $cond: [ {$eq: ['$count_parte', 0]}, 
					'', 
					{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
						'', 
						{ $cond: [ {$eq: ['$count_ins',0]},
							'$ins.unidad',
							'' ] }
						]}
					]
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
				"linea": 1,
				"especie": 1,
				"edad": 1,
				"raza": 1,
				"d_marca": 1,
				"tags": 1,
				"art_margen": 1,
				"tipo": 1,
				'ins': 1,
				'count_ins':1,
				'cerrado':1,
				'count_cerrado': 1,
				'parte':1,
				'count_parte': 1,
				'private_web': 1,
				'fullName': { 
					$cond: [{ $eq: ['$count_ins',0]},
						{ $concat: ['$art_name', ' ', '$name', ' ', '$strContiene', ' ', '$unidad'
						, ' ', '$ins.name'
						//, ' ', '$ins.strContiene', '$ins.unidad'
						] },
						{$cond: [{$eq: ['$count_cerrado', 0]},
							{$concat: ['$art_name', ' ', '$name', ' ', '$strContiene', ' ','$unidad'//, ' ', '$cerrado.name'
//								, ' ', '$cerrado.strContiene', '$cerrado.unidad'
							]},
							{$cond: [{$eq: ['$count_parte',0]},
								{$concat: ['$art_name', ' ', '$name', ' ', '$strContiene', ' ', '$unidad'
								//, ' ', '$parte.name'
//								, ' ', '$parte.strContiene', '$parte.unidad'
								]},
								{$concat: ['$art_name', ' ', '$name', ' ', '$strContiene',' ', '$unidad']},
							]}
						]}
				]}
			}
		},		
		{
			$project: {
				'nopproject': 0
			}
		},
		{
			$match: qry.Extra
		}
	
		,
		{
			$sort: qry.Sort
		}

	])
/*
	const deci = 2;
	for (let i = 0; i < array.length; i++) {
		const e = array[i];
//		e.image = (e.image && e.image.length > 0 ? e.image : e.art_image)
		if (!e.compra && e.reposicion) e.compra = e.reposicion;
		if (e.compra && !e.reposicion) e.reposicion = e.compra;
		e.stock = round(e.stock,deci);
		e.compra = round(e.compra,deci);
		e.reposicion = round(e.reposicion,deci);
		e.promedio = round((e.compra+e.reposicion)/2,deci)
		e.precio = round(e.compra*((e.margen+100)/100),deci);
		e.fullName = (`${e.art_name} ${e.name} ${e.contiene > 1 ? e.contiene : ''} ${e.unidad} ${e.sname} ${e.scontiene > 1 ? e.scontiene : ''} ${e.sunidad}`);
	}
*/
console.log(qry.Sort)
	return array;
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
		this.router.get('/productos/list', this.list);

		this.router.post('/productos/list', this.list);

		this.router.get('/producto/:id', this.leer );

		this.router.get('/producto/marca/:id', this.marca );

		this.router.post('/producto', this.add);
		this.router.delete('/producto/:id', this.delete);
		this.router.put('/productos', this.update);
		this.router.put('/producto/:id', this.modifica);

		// todo lo de abajo parece que es para borrar 
/*
		this.router.get('/articulo/:id/productos', this.listado);
		this.router.delete('/articulo/:id/productos', this.deleteMany);
		this.router.put('/articulo/:id/productos', this.update);

		this.router.post('/productos/buscar', this.buscar)
*/
		this.router.post('/productos/imany', this.update);
		this.router.get('/productos/search/:search', this.search);
		this.router.get('/productos/test', this.test);
	}

	public index(req: Request, res: Response) {
		res.send('Productos');
	}

	async marca(req: Request, res: Response) {
		const { id } = req.params;
		const artList = await readArticulos({ Articulo: { marca: id,  }, Project: {'_id': 1}, Sort: {'_id': 1} });
		for (let index = 0; index < artList.length; index++) {
			artList[index] = new ObjectID(artList[index]._id);
		}
//		console.log(artList);
		const qry = { Producto: {'articulo' : { '$in': artList }, pCompra: true }};
		const readData: any = await productoGetData(qry);
		res.status(200).json(readData)
	}

	async list(req: Request, res: Response) {
//		const { id } = req.params;
		let qry = req.body;
		let myMatch: any;
		let artList: any[] = [];
		if (qry.searchItem && qry.searchItem.length == 1){
			myMatch = {
				'$or': [
					{ 'codigo': qry.searchItem },
					{ 'plu': qry.searchItem }
				]
			}
			artList = await producto.find(myMatch);
		}
		if ((myMatch == undefined || artList.length == 0) && qry.searchItem ) {
			console.log(qry.searchItem)
			const Articulo = articuloSanitizeString(qry.searchItem);

			if (Articulo){
				artList = await readArticulos({ Articulo, Project: {'_id': 1}, Sort: {'_id': 1} });
				for (let index = 0; index < artList.length; index++) {
//					artList[index] = new ObjectID(artList[index]._id);
					artList[index] = artList[index]._id;
				}
//				console.log(artList);
				qry.Producto['articulo'] = { '$in': artList }
			}
		}
		const readData: any = await productoGetData(qry);
		res.status(200).json(readData)
	}

	async test(req: Request, res: Response) {
//		const array:any = await productoGetData({});
		const qry = { articulo: '' };
		const array:any = await producto.aggregate([
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
/*
				{
					 $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
				},
*/
//				{ $project: { fromItems: 0 } }
	
		]).sort({name: 1})
		res.status(200).json(array);
	}

	async listado(req: Request, res: Response) {
		const { id } = req.params
		const list = await producto.find({ articulo: new ObjectID(id) });
		res.json(list);
	}

	async leer(req: Request, res: Response) {
		try {
			const { id } = req.params

//			const rpta = await producto.findById(id).populate();
			const rpta = await productoGetData({Producto: {_id: new ObjectID(id)}, Project: {fullName: 1}});
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
		try {
			const array = [];
			for (let i = 0; i < req.body.length; i++) {
				const e = req.body[i];
				const rpta = await producto.updateOne( {_id: e._id}, { $set :  e  }, { upsert: true });
				array.push(rpta)
//				const reg = new producto(e);
//				const reslt = await reg.save();
			}
			res.status(200).json(array);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}

	async insertMany(req: Request, res: Response) {
		try {
			console.log(req.body);
			const rpta = await producto.insertMany(req.body);
			res.status(200).json(rpta);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async add(req: Request, res: Response) {
		try {
//			const reg = await producto.findOne({ name: req.body.name });
//			if (reg)
//				return res.status(400).json({ msg: 'Registro ya existe', reg });
			const newReg = new producto(req.body);
			await newReg.save();
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', newReg });
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async modifica(req: Request, res: Response) {
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
//			const rpta: any = await readProductos(qry);
			const rpta: any = await productoGetData(qry);
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
