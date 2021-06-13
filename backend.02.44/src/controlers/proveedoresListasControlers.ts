import {Request, Response, Router} from 'express';
import { ObjectID } from 'bson'
import passport from "passport";
import lista, {IProveedoresListas} from '../models/proveedoresListas'

class ProveedoresListasControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
		this.router.get( '/proveedoreslistas/list', this.list );
		this.router.post( '/proveedoreslistas/import', this.import );
		this.router.post( '/proveedoreslistas/getid', this.provlistaid );
		this.router.post( '/proveedoreslistas/savelink', this.savelink );
	}

	public index(req: Request, res: Response) {
		res.send('Proveedores Listas');
	}

	async list(req: Request, res: Response) {
		try {
      const retData = await lista.find().sort({marca: 1, edad: 1, descripcion: 1});
      res.status(200).json(retData);
    } catch (error) {
			return res.status(404).json( error );			
		}
	}

  async import(req: Request, res: Response){
    try {
      if(req.body._id) req.body._id = new ObjectID(req.body._id);
      if(req.body.id_proveedor) req.body.id_proveedor = new ObjectID(req.body.id_proveedor);
      if(req.body.id_articulo) req.body.id_articulo = new ObjectID(req.body.id_articulo);
      if(req.body.id_producto) req.body.id_producto = new ObjectID(req.body.id_producto);
      if(!(req.body.id_proveedor
        && req.body.codigo_proveedor)) {
          return res.status(400).json({msg: 'falta dato requerido', id_proveedor: req.body.id_proveedor, codigo_proveedor: req.body.codigo_proveedor})
      }
      const newReg = await lista.updateOne(
        { _id: req.body._id },   // Query parameter
        { $set: req.body }, 
        { upsert: true }    // Options
      );
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', newReg });
		} catch (error) {
			res.status(500).json(error);
		}
	}
  async savelink(req: Request, res: Response){
    try {
      if(req.body._id) req.body._id = new ObjectID(req.body._id);
      if(req.body.id_articulo) req.body.id_articulo = new ObjectID(req.body.id_articulo);
      if(req.body.id_producto) req.body.id_producto = new ObjectID(req.body.id_producto);
      if(!(req.body._id)) {
          return res.status(400).json({msg: 'falta dato requerido', id_proveedor: req.body.id_proveedor, codigo_proveedor: req.body.codigo_proveedor})
      }
      const newReg = await lista.updateOne(
        { _id: req.body._id },   // Query parameter
        { $set: req.body }, 
        { upsert: true }    // Options
      );
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', newReg });
		} catch (error) {
			res.status(500).json(error);
		}
	}
  async importPrecio(req: Request, res: Response){
    try {
      if(req.body._id) req.body._id = new ObjectID(req.body._id);
      if(req.body.id_proveedor) req.body.id_proveedor = new ObjectID(req.body.id_proveedor);
      if(req.body.id_articulo) req.body.id_articulo = new ObjectID(req.body.id_articulo);
      if(req.body.id_producto) req.body.id_producto = new ObjectID(req.body.id_producto);
      if(!(req.body.id_proveedor 
        && req.body.codigo_proveedor )) {
          return res.status(400).json({msg: 'falta dato requerido', id_proveedor: req.body.id_proveedor, codigo_proveedor: req.body.codigo_proveedor, fecha: req.body.fecha})
      }
      const newReg = await lista.updateOne(
								{ id_proveedor: req.body.id_proveedor
                , id_lista: req.body.id_lista
                , codigo_proveedor: req.body.codigo_proveedor
                , fecha: req.body.fecha
                },   // Query parameter
								{ $set: req.body }, 
								{ upsert: true }    // Options
							);
			res.status(200).json({ msg: 'Registro grabado satisfactoriamente', newReg });
		} catch (error) {
			res.status(500).json(error);
		}
	}
  async provlistaid(req: Request, res: Response){
    try {
      if(req.body.id_proveedor) req.body.id_proveedor = new ObjectID(req.body.id_proveedor);

      const newReg = await lista.find(
								{ id_proveedor: req.body.id_proveedor
                , codigo_proveedor: req.body.codigo_proveedor
                });
//      console.log(req.body)
      let status = 0;
      const retData = {};
      if(newReg.length === 0) {
        retData['_id'] =  new ObjectID();
        retData['status'] = 0;
      } else {
        retData['_id'] =  newReg[0]['_id'];
        retData['status'] = 1;
      }
//      console.log(newReg);
			res.status(200).json(retData);
		} catch (error) {
			res.status(500).json(error);
		}
	}

}

export const ProveedoresListasCtrl = new ProveedoresListasControler();