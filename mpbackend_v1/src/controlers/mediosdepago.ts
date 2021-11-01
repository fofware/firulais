import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys } from "../config/mpKey";
const Authorization = `Bearer ${mpKeys.AccessToken}`;
/*
import { ExtractJwt } from "passport-jwt";
import jwt from 'jsonwebtoken';
import config from '../config/config';
import passport from "passport";
import { ObjectID } from 'bson'
*/
class mediosdepagoControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/mediosdepago',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
  }

	async list(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/v1/payment_methods' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
		const options = {
			host: 'api.mercadopago.com',
			path: '/v1/payment_methods',
			method: 'GET',
			headers: {
				'Authorization': `${Authorization}`//'Bearer TEST-3527848825753216-092312-ea8b6370ee241c138f64f12278d07bfa-84242924'
			}
		};

		const request = https.request(options, (ret) => {
			if (ret.statusCode !== 200) {
				console.error(`Did not get an OK from the server. Code: ${ret.statusCode}`);
				ret.resume();
				return;
			}
		
			let data = '';
		
			ret.on('data', (chunk) => {
				data += chunk;
			});
		
			ret.on('close', () => {
				console.log('Retrieved all data');
				console.log(JSON.parse(data));
				res.status(200).json(JSON.parse(data));
			});
		})
		request.end();
		request.on('error', (err) => {
			console.error(`Encountered an error trying to make a request: ${err.message}`);
		});
	}

}

export const mediosdepagoCtrl = new mediosdepagoControler();