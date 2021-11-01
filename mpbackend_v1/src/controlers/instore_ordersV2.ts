import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys } from "../config/mpKey";

const Authorization = `Bearer ${mpKeys.AccessToken}`;

class ordersControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/orders/:external_pos_id',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
  }

	async list(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/instore/qr/seller/collectors/{user_id}/pos/{external_pos_id}/orders' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
    const {external_pos_id} = req.params;
		const options = {
			host: 'api.mercadopago.com',
			path: `/instore/qr/seller/collectors/${mpKeys.userId}/pos/${external_pos_id}/orders`,
			method: 'GET',
			headers: {
				'Authorization': Authorization
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

export const ordersCtrl = new ordersControler();