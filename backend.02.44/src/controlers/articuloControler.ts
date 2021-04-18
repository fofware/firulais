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
export const productoGetData = async function( qry: any ): Promise<IProducto[]> {
	if( !qry.Producto ) qry.Producto = {};
	if( !qry.Articulo ) qry.Articulo = {};
	if( !qry.Extra ) qry.Extra = {};
	if( !qry.Project) qry.Project = { 'noproject': 0}
	if( !qry.Decimales) qry.Decimales = 2;
//	if( !qry.Sort ) qry.Sort = {'fabricante': 1, 'marca': 1, 'especie': 1, 'rubro': 1, 'linea': 1, 'edad': 1, 'raza': 1	};
	if( !qry.Sort ) qry.Sort = { 'rubro': 1, 'linea': 1, 'contiene': 1, 'precio': 1 };
//	console.log(qry.Producto);
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
				'art_name':{ $trim: 
					{ input: 
						{	$concat: [
							{ $cond: ['$art.d_fabricante', '$art.fabricante', '']},
							{ $cond: ['$art.d_marca', ' ', '']},
							{ $cond: ['$art.d_marca', '$art.marca', '']},
							{ $cond: ['$art.d_linea', ' ', '']},
							{ $cond: ['$art.d_linea', '$art.linea', '']},
							{ $cond: ['$art.d_especie', ' ', '']},
							{ $cond: ['$art.d_especie', '$art.especie', '']},
							{ $cond: ['$art.d_edad', ' ', '']},
							{ $cond: ['$art.d_edad', '$art.edad', '']},
							{ $cond: ['$art.d_raza', ' ', '']},
							{ $cond: ['$art.d_raza', '$art.raza', '']},
							' ',
							'$art.name'
							]
						}
					}
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
				"strContiene": {$cond: [{$eq:['$count_ins',0]}, {$concat: ['con ','$strContiene']}, '$strContiene']},
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
				"precio": { $ceil:
					{ 
						$cond: [ {$eq: ['$count_parte', 0]}, 
							{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$parte.compra', '$parte.contiene'] } ] }, 
							{ $cond: 
								[ {$eq:[ '$count_cerrado', 0 ]}, 
								{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$cerrado.compra', '$cerrado.contiene'] } ] }, 
								{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, '$compra' ] }
								]
							}]
					}
				},
				"precioref": {
					$round: [
						{
							$cond: [{ $eq: ['$count_parte', 0] },
							{ $multiply: [{ $add: ['$margen', 100] }, 0.01, { $divide: ['$parte.compra', '$parte.contiene'] }] },
							{
								$cond: [{ $eq: ['$count_cerrado', 0] },
								{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$cerrado.compra'] }, { $cond: [{ $eq: ['$cerrado.contiene', 0] }, 1, { $multiply: ['$cerrado.contiene', '$contiene'] }] }] },
								{
									$cond: [{ $eq: ['$count_ins', 0] },
									{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$ins.contiene', 0] }, '$contiene', { $multiply: ['$contiene', '$ins.contiene'] }] }] },
									{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$contiene', 0] }, 1, '$contiene'] }] }
									]
								}
								]
							}
							]
						},
						{
							$cond: [
								{
									$lt: [
										{
											$cond: [{ $eq: ['$count_parte', 0] },
											{ $multiply: [{ $add: ['$margen', 100] }, 0.01, { $divide: ['$parte.compra', '$parte.contiene'] }] },
											{
												$cond: [{ $eq: ['$count_cerrado', 0] },
												{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$cerrado.compra'] }, { $cond: [{ $eq: ['$cerrado.contiene', 0] }, 1, { $multiply: ['$cerrado.contiene', '$contiene'] }] }] },
												{
													$cond: [{ $eq: ['$count_ins', 0] },
													{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$ins.contiene', 0] }, '$contiene', { $multiply: ['$contiene', '$ins.contiene'] }] }] },
													{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$contiene', 0] }, 1, '$contiene'] }] }
													]
												}
												]
											}
											]
										},
										1
									]
								},
								2,
								qry.Decimales

							]
						}
					]
				},
				'sub': {
					$cond: [ {$eq: ['$count_ins',0]},
						'$ins',
						{$cond: [{$eq: ['$count_parte',0]},
							'$parte',
							{$cond: [{$eq: ['$count_cerrado',0]},
								'$cerrado',
								{'name':'','strContiene':'','unidad':''}
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
				"stock":{ $floor: 
					{ $cond: [ {$eq: ['$count_parte', 0]}, 
						{ $multiply: ['$parte.stock', '$parte.contiene']}, 
						{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
							{ $multiply: ['$cerrado.stock', '$cerrado.contiene']},
							{ $cond: [ {$eq: ['$ins_count',0]},
								{ $cond: [ {$gte: [ '$stock', 1] }, '$stock', 0]}, 
								{ $cond: [ {$gte: [ '$stock', 1] }, '$stock', 0]} 
							]}
						]}
					]}
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
				"sStrContiene": { $cond: [ {$eq: ['$count_parte', 0]}, 
					'', 
					{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
						'', 
						{ $cond: [ {$eq: ['$count_ins',0]},
							'$ins.strContiene',
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
				'private_web': 1
			}
		},
		{ $project: {
			"_id": 1,
			"name": 1,
			"contiene": 1,
			"strContiene": 1,
			"unidad": 1,
			"compra": 1,
			"reposicion": 1,
			"promedio": 1,
			"precio": 1,
			"precioref": 1,
			'sub': 1,
			"pesable": 1,
			"servicio": 1,
			"pVenta": 1,
			"pCompra": 1,
			"codigo": 1,
			"plu": 1,
			"image": 1,
			"stock":1,
			"divisor": 1,
			"scontiene": 1,
			"sname": 1,
			"sunidad": 1,
			"sStrContiene": 1,
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
			'fullName': //{
//				$trim: 
//				{ input: 
					{ $concat: [
						'$art_name', 
						{ $cond: [{ $eq: ['$name', '']}, '', ' ']},
						'$name',
						{ $cond: [{ $eq: ['$strContiene', '']}, '', ' ']},
						'$strContiene',
						{ $cond: [{ $eq: ['$unidad', '']}, '', ' ']},
						'$unidad',
						{ $cond: [{ $eq: ['$sname', '']}, '', ' ']},
						'$sname',
						{ $cond: [{ $eq: ['$sStrContiene', '']}, '', ' ']},
						'$sStrContiene',
						{ $cond: [{ $eq: ['$sunidad', '']}, '', ' ']},
						'$sunidad'
						]
//					}
//				}
			},
			'fullName1': { 
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
				]
			}
		}
	},
	{
		$project: {
			'nopproject': 0
		}
	},
	{
		$match: qry.Extra
	},
	{
		$sort: qry.Sort
	},
	{
		$group: { _id : "$art_name", productos: { $push: "$$ROOT" } }
	}
	])
	return array;
} 

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
				{ $cond: [ { $or: ['$d_marca','$d_fabricante'] }, ' ', '']},
				'$name',
				{ $cond: ['$d_especie', ' ', '']},
				{ $cond: ['$d_especie', '$especie', '']},
				{ $cond: ['$d_edad', ' ', '']},
				{ $cond: ['$d_edad', '$edad', '']},
				{ $cond: ['$d_raza', ' ', '']},
				{ $cond: ['$d_raza', '$raza', '']},
				{ $cond: ['$d_rubro', ' ', '']},
				{ $cond: ['$d_rubro', '$rubro', '']},
				{ $cond: ['$d_linea', ' ', '']},
				{ $cond: ['$d_linea', '$linea', '']},
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

export const readProductos1 = function ( qry: any ): PromiseLike<any[]> {
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

export const readProductos = function ( qry: any ): PromiseLike<any[]> {
	if (!qry.Articulo) qry.Articulo = {};
	if (!qry.Producto) qry.Producto = {};
	if (!qry.Project){
		qry.Project = artProject; 
		qry.Project.productos = 1;
	}
	if (!qry.Sort) qry.Sort = {fullName: 1};
	qry.Decimales = 0;
	return articulo.aggregate([
		{ $match: qry.Articulo },
		{ $lookup:
			{
				from: "productos",
				let: { articuloId: "$_id"},
				pipeline: [
					{ $match: { 
						 $expr:
									 { $eq: [ "$articulo",  "$$articuloId" ] },
					 }
					} ,
					{
						$addFields: {
						"strContiene": {$toString: '$contiene'}
				 }},
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
										$project: { _id: 1, parent: 1, name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, image: 1, strContiene: {$toString: '$contiene'},
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
										$project: { _id: 1, parent: 1, name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, image: 1, strContiene: {$toString: '$contiene'} } 
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
										$project: { _id: 1, parent: 1, name: 1, contiene: 1, unidad: 1, precio: 1, compra: 1, reposicion: 1, stock: 1, image: 1, strContiene: {$toString: '$contiene'} } 
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
				{ $project: 
				{
					"_id": 1,
					"name": 1,
					"contiene": 1,
					"strContiene": {$cond: [{$eq:['$count_ins',0]}, {$concat: ['con ','$strContiene']}, '$strContiene']},
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
					precio: 1,
					"calc_precio": { $ceil:
						{ 
							$cond: [ {$eq: ['$count_parte', 0]}, 
								{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$parte.compra', '$parte.contiene'] } ] }, 
								{ $cond: 
									[ {$eq:[ '$count_cerrado', 0 ]}, 
									{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, { $divide: ['$cerrado.compra', '$cerrado.contiene'] } ] }, 
									{ $multiply:[ {$add: [ '$margen', 100 ] },0.01, '$compra' ] }
									]
								}]
						}
					},
					"precioref": {
						$round: [
							{
								$cond: [{ $eq: ['$count_parte', 0] },
								{ $multiply: [{ $add: ['$margen', 100] }, 0.01, { $divide: ['$parte.compra', '$parte.contiene'] }] },
								{
									$cond: [{ $eq: ['$count_cerrado', 0] },
									{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$cerrado.compra'] }, { $cond: [{ $eq: ['$cerrado.contiene', 0] }, 1, { $multiply: ['$cerrado.contiene', '$contiene'] }] }] },
									{
										$cond: [{ $eq: ['$count_ins', 0] },
										{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$ins.contiene', 0] }, '$contiene', { $multiply: ['$contiene', '$ins.contiene'] }] }] },
										{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$contiene', 0] }, 1, '$contiene'] }] }
										]
									}
									]
								}
								]
							},
							{
								$cond: [
									{
										$lt: [
											{
												$cond: [{ $eq: ['$count_parte', 0] },
												{ $multiply: [{ $add: ['$margen', 100] }, 0.01, { $divide: ['$parte.compra', '$parte.contiene'] }] },
												{
													$cond: [{ $eq: ['$count_cerrado', 0] },
													{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$cerrado.compra'] }, { $cond: [{ $eq: ['$cerrado.contiene', 0] }, 1, { $multiply: ['$cerrado.contiene', '$contiene'] }] }] },
													{
														$cond: [{ $eq: ['$count_ins', 0] },
														{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$ins.contiene', 0] }, '$contiene', { $multiply: ['$contiene', '$ins.contiene'] }] }] },
														{ $divide: [{ $multiply: [{ $add: ['$margen', 100] }, 0.01, '$compra'] }, { $cond: [{ $eq: ['$contiene', 0] }, 1, '$contiene'] }] }
														]
													}
													]
												}
												]
											},
											1
										]
									},
									2,
									qry.Decimales
	
								]
							}
						]
					},
					'sub': {
						$cond: [ {$eq: ['$count_ins',0]},
							'$ins',
							{$cond: [{$eq: ['$count_parte',0]},
								'$parte',
								{$cond: [{$eq: ['$count_cerrado',0]},
									'$cerrado',
									{'name':'','strContiene': '','unidad':''}
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
					"image": 1,
					"stock":{ $floor: 
						{ $cond: [ {$eq: ['$count_parte', 0]}, 
							{ $multiply: ['$parte.stock', '$parte.contiene']}, 
							{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
								{ $multiply: ['$cerrado.stock', '$cerrado.contiene']},
								{ $cond: [ {$eq: ['$ins_count',0]},
									{ $cond: [ {$gte: [ '$stock', 1] }, '$stock', 0]}, 
									{ $cond: [ {$gte: [ '$stock', 1] }, '$stock', 0]} 
								]}
							]}
						]}
					},
					"divisor": { $cond: [ {$eq: ['$count_parte', 0]}, 
						'$parte.contiene', 
						{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
							'$cerrado.contiene', 
							{ $cond: [ {$eq: ['$ins_count',0]},
								'$ins.contiene',
								1 ] }
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
					"sStrContiene": { $cond: [ {$eq: ['$count_parte', 0]}, 
						'', 
						{ $cond: [ {$eq:[ '$count_cerrado', 0 ]}, 
							'', 
							{ $cond: [ {$eq: ['$count_ins',0]},
								'$ins.strContiene',
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
					"tipo": 1,
//					'ins': 1,
					'count_ins':1,
//					'cerrado':1,
					'count_cerrado': 1,
//					'parte':1,
					'count_parte': 1,
					'parent': 1
				}
				},
				{
					$sort: { 'name': 1, 'contiene': -1, 'sub.contiene': -1 }
				}
	
			],
			as: "productos"
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

	export const articuloSanitize = async function (qry: any) {
		//	if(!search || search.length == 0) return null;
		const artFlds = ['name','fabricante','marca','rubro', 'linea', 'especie', 'edad', 'raza', 'tags'];
		const Articulo = {};
		const Extra = {};
		const In = [];
		let a = [];
		let t = [];
		let e = [];
		if (qry.Articulo){
			for (const key in qry.Articulo) {
				if (Object.prototype.hasOwnProperty.call(qry.Articulo, key)) {
					const e = qry.Articulo[key];
					Articulo[key] = (e['$regex'] ? {$regex: new RegExp(e['$regex'].params, e['$regex'].flags )} : e); 
					artFlds.splice (artFlds.indexOf(key), 1)
				}
			}
			const lista = await readArticulos({ Articulo, Project: {'_id': 1}, Sort: {'_id': 1} });
			for (let index = 0; index < lista.length; index++) {
				lista[index] = new ObjectID(lista[index]._id);
			}
			t = t.concat(lista);
		}

		if (qry.searchItem.length > 0){
			const searchItem = qry.searchItem.replace(/  /g, ' ');
			const array: any[] = searchItem.trim().split(' ');
			Articulo['$and'] = [];
			for (let index = 0; index < array.length; index++) {
				const str = array[index];
				const v = {}
				v['$or'] = [];
				for (let n = 0; n < artFlds.length; n++) {
					const fld = artFlds[n];
					const o = {};
					o[fld] = { $regex: new RegExp( str, 'i' ) } 
					v['$or'].push(o);
				}
				const testQry = v; //{ '$or':[ v['$or'][v['$or'].length-1]] }
				const lista = await readArticulos({ Articulo: { '$and': [ {_id: { $in: t}}, testQry ] }, Project: {'_id': 1}, Sort: {'_id': 1} });
				if (lista.length > 0){
					if(Articulo['$and']) Articulo['$and'] = [];
					Articulo['$and'].push(v);
					for (let index = 0; index < lista.length; index++) {
						lista[index] = new ObjectID(lista[index]._id);
					}
					t = lista;
				} else {
					v['$or'].push({fullName: { $regex: new RegExp(str, 'i')}})
					if (!Extra['$and']) Extra['$and'] = [];
					Extra['$and'].push(v)
					e.push(str);
				}
			}
		}
		a = t
		if(Articulo['$and'] && Articulo['$and'].length === 0) delete Articulo['$and'];
		return { Articulo, lista: a, failString: e, Extra } 
	}

	export const articuloSanitizeString = function (search: string, artQry?: any) {
//	if(!search || search.length == 0) return null;
	artQry = (artQry ? artQry : {});
	const Articulo = [];
	const Extra = [];

	const searchItem = search.replace(/  /g, ' ');
	const array: any[] = searchItem.trim().split(' ');
	const artFlds = ['name','fabricante','marca','rubro', 'linea', 'especie', 'edad', 'raza', 'tags'];
	const a = [];
	const e = [];
	const keys = []
/*
	for (const key in artQry) {
		if (Object.prototype.hasOwnProperty.call(artQry, key)) {
			keys.push(key);
			switch (artQry[key].qryValue) {
				case '$regex':
					v[fld] = { $regex: new RegExp(artQry.qryValue['$regex']) }
					break;
				default:
					v[fld] = artQry.qryValue
					break;
			}
			console.log("v", fld, v);
			a.push( v ); 
		}
	}
*/
	console.log("articuloControler-artQry", artQry);
		for (let i = 0; i < artFlds.length; i++) {
			const fld = artFlds[i];
			const v = {};
			if (artQry[fld]){
				switch (artQry.qryValue) {
					case '$regex':
						v[fld] = { $regex: new RegExp(artQry.qryValue['$regex']) }
						break;
					default:
						v[fld] = artQry.qryValue
						break;
				}
				console.log("v", fld, v);
				a.push( v ); 
			} else {
				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					v[fld] = {$regex: new RegExp( `${element}`)};
				}
			}
/*
		const o = [{'name': {$regex: new RegExp( `${element}` , 'i')}},
			{'fabricante': {$regex: new RegExp( `${element}` , 'i')}},
			{'marca': {$regex: new RegExp( `${element}` , 'i')}},
			{'rubro': {$regex: new RegExp( `${element}` , 'i')}},
			{'linea': {$regex: new RegExp( `${element}` , 'i')}},
			{'especie': {$regex: new RegExp( `${element}` , 'i')}},
			{'edad': {$regex: new RegExp( `${element}` , 'i')}},
			{'raza': {$regex: new RegExp( `${element}` , 'i')}},
			{'tags': {$regex: new RegExp( `${element}` , 'i')}}
		];

		const e = [
			{'fullName': {$regex: new RegExp( `${element}` , 'i')}},
			{'fabricante': {$regex: new RegExp( `${element}` , 'i')}},
			{'marca': {$regex: new RegExp( `${element}` , 'i')}},
			{'rubro': {$regex: new RegExp( `${element}` , 'i')}},
			{'linea': {$regex: new RegExp( `${element}` , 'i')}},
			{'especie': {$regex: new RegExp( `${element}` , 'i')}},
			{'edad': {$regex: new RegExp( `${element}` , 'i')}},
			{'raza': {$regex: new RegExp( `${element}` , 'i')}},
			{'tags': {$regex: new RegExp( `${element}` , 'i')}}
		];
*/
		Articulo.push({'$or': a });
		Extra.push({'$or': e });
	}
	return { Articulo, Extra } ;
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
				Articulo['$add'] = articuloSanitizeString(search);
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
				Articulo['$and'] = articuloSanitizeString(search);
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
			console.log('Entra qry', qry);
			const ret = await articuloSanitize(qry);
			console.log('ret',ret)
			qry.Articulo = { _id: { $in: [ret.lista]}};
			qry.Articulo =  ret.Articulo;
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