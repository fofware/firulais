import {Request, Response, Router} from 'express';
import { ObjectID } from 'bson'
import passport from "passport";
import articulo, { IArticulo } from '../models/articulos';
import producto, { IProducto } from '../models/producto';
import provArt from '../models/proveedoresArticulos';
import provProd, { IProveedoresProductos } from '../models/proveedoresProductos';
import provProdFields, {IProveedoresProductosFields} from '../models/proveedoresProductosFields'; 

async function addFields(data:any){
	let fields:any[] = [];
	console.log("data", data);
	console.log(data.lista_id);
	console.log("----------------------------------");

	let detail = {};
	for (const key in data) {
		if (Object.prototype.hasOwnProperty.call(data, key)){
			if(['_id','proveedor','codigo','provproducto_id','createdAt','updatedAt', 'lista_id'].findIndex( value => value === key) === -1){
				const e = data[key];
				if(!detail[key]) detail[key] = 0;
				const filter = { provproducto_id: data.provproducto_id, field: key };
				const array = await provProdFields.find(filter);
				switch (array.length) {
					case 0:
						//console.log('case 0');
						filter['value'] = e;
						filter['activo'] = true;
						filter['lista_id'] = data.lista_id; 
						const fldData = await savefld(filter);
						fields.push(fldData);
						break;
					case 1:
						//console.log('case 1');
						if(array[0]['_doc'].value !== e){
							//console.log("Case Nuevos Valores",1,e);
							//console.log("Nuevo Valor",key,array[0]['_doc'].value,'#',e);
							filter['value'] = e;
							filter['activo'] = false;
							filter['new'] = true;
							filter['lista_id'] = data.lista_id; 
							const fldData = await savefld(filter);
							fields.push(fldData);
						}
						break;
					default:
						const filter1 = { provproducto_id: data.provproducto_id, field: key, value: e };
						const array1 = await provProdFields.find(filter1);
						if(array1.length === 0){
							//console.log("Nuevo Valor",key,e);
							filter1['new'] = true;
							filter1['activo'] = false;
							filter1['lista_id'] = data.lista_id; 
							const fldData = await savefld(filter1);
							fields.push(fldData);
						}
						//else {
						//	console.log("Case","default",key,e);
						//	console.log('array1',array1);
						//	//filter['value'] = e;
						//	//filter['activo'] = false;
						//	//filter['new'] = true;
						//	//const fldData = await savefld(filter1);
						//	//fields.push(fldData);
						//}
						break;
				}
			}
		}
	}
	return fields;
}

async function savefld(data): Promise<IProveedoresProductosFields> {
	const toSave = new provProdFields(data);
	return await toSave.save();
}

class ProveedoresProductosControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/api/proveedoresproductos/list'
										//, passport.authenticate('jwt', {session:false})
										, this.list );
		this.router.post( '/api/proveedoresproductos/ids'
										, passport.authenticate('jwt', {session:false})
										, this.idslist );
		this.router.post( '/api/proveedoresproductos/'
										, passport.authenticate('jwt', {session:false})
										, this.add );
		this.router.get('/api/proveedoresproductos/nombre/:search'
										//, passport.authenticate('jwt', {session:false})
										, this.search );
	}

	async list(req: Request, res: Response) {
		const productos = await provProd.find({}).sort({ nombre: 1, peso: 1, bulto: 1 }).populate('fieldsvalues').populate('proveedor');
		res.json(productos);
	}

	async idslist(req: Request, res: Response){
		const productos = await provProd.find({_id: { $in: req.body}}).populate('fieldsvalues').populate('proveedor');
		res.json(productos);
	}
	async productofromfields(req: Request, res: Response){
		const { search } = req.params;
		const filter = search ? {field: 'nombre', value: search} : {};

	}
	async search(req: Request, res: Response){
		const { search } = req.params;
		const data = await provProd.aggregate(
			[
				{ $match: { $text: { $search: search } } },
				{ $addFields: {
					score: { $meta: "textScore" } 
				}},
				//{ $match: { producto_id: null, '$and': values } },
				//{
				//	$lookup: {
				//		from: "proveedores",
				//		localField: "proveedor",    // field in the orders collection
				//		foreignField: "_id",  // field in the items collection
				//		as: "proveedor"
			 	//	}
				//},
				//{
				//	$unwind: {
				//		path: '$proveedor',
				//		preserveNullAndEmptyArrays: true
				//	}				
				//},
				//{ $project: { nombre: 1, contiene: 1, unidad:1, proveedor: { $concat:['$proveedor.apellido', " ", '$proveedor.nombre']}, score: { $meta: "textScore" } } },
				{ $sort: { score: -1, nombre: 1, peso: 1, unidades: 1 } },
				//{ $match: { score: { $gt: 1.0 } } }
			]
		);
		//const retData = data.map(item => `${item.nombre} ${item.contiene} ${item.unidad} ${item.proveedor} ${item.score}` )
		res.status(200).json(data);
	}


	async add( req: Request, res: Response){
		req.body.codigo = req.body.codigo+'';
		req.body.proveedor = new ObjectID(req.body.proveedor);
		req.body.codigo = req.body.codigo.trim();

		try {
			const filter = { proveedor: req.body.proveedor, codigo: req.body.codigo };
			const reg = await provProd.findOne(filter);
			let ret = {};
			if(reg){
				ret = {
					msg: 'Coódgo existe, para los mismos datos',
					savedData: reg,
					ok: 1,
					nuevo: false
				}
				req.body.provproducto_id = reg._id;
				const diff:any = await addFields(req.body);
				const contadores = {};
				if(diff.length){
					const flds:any = reg.fieldsvalues || [];
					//console.log(reg.codigo, reg.nombre);

					for (let index = 0; index < diff.length; index++) {
						const e = diff[index]._id;
						
						contadores[diff[index].field] = contadores[diff[index].field] ? contadores[diff[index].field]+1 : 1;

						//switch (diff[index].field) {
						//	case 'codigo':
						//		break;
						//	case 'nombre':
						//		break;
						//	case 'peso':
						//		break;
						//	case 'unidades':
						//		break;
						//	case 'ean':
						//		break;
						//	case 'precio':
						//		break;
						//	case 'bulto':
						//		break;
						//	case 'sugerido':
						//		break;
						//	case 'peso_name':
						//	case 'unidades_name':
						//	case 'fabricante':
						//	case 'marca':
						//	case 'name':
						//	case 'especie':
						//	case 'edad':
						//	case 'raza':
						//	case 'rubro':
						//	case 'linea':
						//	default:
						//		break;
						//}

						//if(['nombre','peso','unidades'].findIndex( value => value === diff[index].field) > -1 && reg[diff[index].field] !== diff[index].value){
						//	console.log(reg.codigo, reg.nombre, reg.peso,reg.unidades);
						//	console.log("Problema--",diff[index].field, diff[index].value);
						//}
						flds.push(e);
					}
					//const newr = new provProd(reg);
					const prodata = await reg.save();
					const savedData = prodata;
					ret = {
						msg: "Cambiaron los Datos para este codigo",
						contadores,
						savedData,
						ok: 0,
						nuevo: false
					}
				}
			} else {
				const newr = new provProd(req.body);
				const prodata:any = await newr.save();
				req.body.provproducto_id = new ObjectID(prodata._id);
				let changes = 0;
				const flds:any = [];
				for (const key in req.body) {
					if (Object.prototype.hasOwnProperty.call(req.body, key)) {
						const value = req.body[key];
						if(['_id','proveedor','codigo','provproducto_id','createdAt','updatedAt','field_id','lista_id'].findIndex( value => value === key) === -1){
							const value = req.body[key];
							const newFld = await savefld({ provproducto_id: req.body.provproducto_id, lista_id: req.body.lista_id,field: key, value, activo: true });
 							prodata.fieldsvalues.push( newFld['_id'] );
							changes++;
						}
					}
				}
				if (changes){
					const nd = await prodata.save();
					ret = {
						msg: 'Nuevo producto',
						savedData: nd,
						ok: 1,
						nuevo: true
					};
				} else {
					ret = {
						msg: 'Nuevo producto',
						savedData: prodata,
						ok: 1,
						nuevo: true
					};
				}
				//console.log(changes,ret);
			}
			return res.status(200).json(ret);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
}

export const ProveedoresProductosCtrl = new ProveedoresProductosControler();