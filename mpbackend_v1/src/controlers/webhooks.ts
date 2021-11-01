
import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys } from "../config/mpKey";
import mp_hooks from "../models/mp_hooks";
const Authorization = `Bearer ${mpKeys.AccessToken}`;

class webhooksControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.post('/webhooks',
      //passport.authenticate('jwt', {session:false}), 
      this.save );
  }

  async save(req: Request, res: Response): Promise<void> {
    try {
      req.body.qry = req.query
      const newReg = new mp_hooks(req.body);
      const result = await newReg.save();
      res.status(200).json({newReg,result});
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  }
  
}

export const webhooksCtrl = new webhooksControler();

