import { Request, Response, Router } from "express";
import passport from "passport";
import { ObjectID } from 'bson'
import tmpLista from "../models/tmplistas";
import tmplistas from "../models/tmplistas";

class TmpListasControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.post('/api/tmplistas/create',
                    //passport.authenticate('jwt', {session:false}), 
                    this.create );
  }

	async create(req: Request, res: Response) {
		try {
//      console.log(req.body.data)
      const tmpId = new ObjectID();
      for (let i = 0; i < req.body.data.length; i++) {
        const e = req.body.data[i];
        e.tmpID = tmpId;
      }
			const add = await tmpLista.insertMany(req.body.data);
      req.body.aggregate.push({"$match":{'tmpID': new ObjectID(tmpId)}});
      console.log(req.body.aggregate)
      const result = await tmplistas.aggregate(req.body.aggregate);
      const borrado = await tmplistas.deleteMany({tmpID: new ObjectID(tmpId)});
      console.log(borrado);
			res.status(200).json({ msg: 'Registro creado satisfactoriamente', result, tmpId });
    } catch (error) {
      console.log(error)
			res.status(400).json({ msg: error, result: null});
		}
	}

}

export const TmpListasCtrl = new TmpListasControler();