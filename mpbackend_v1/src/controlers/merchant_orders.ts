import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys, mpKeysProd } from "../config/mpKey";

const Authorization = `Bearer ${mpKeysProd.AccessToken}`;

class merchantOrdersControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/merchant_orders/',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
  }

	async list(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/merchant_orders/search?status=12123adfasdf123u4u&preference_id=12123adfasdf123u4u&application_id=12123adfasdf123u4u&payer_id=12123adfasdf123u4u&sponsor_id=12123adfasdf123u4u&external_reference=12123adfasdf123u4u&site_id=12123adfasdf123u4u&marketplace=12123adfasdf123u4u&date_created_from=12123adfasdf123u4u&date_created_to=12123adfasdf123u4u&last_updated_from=12123adfasdf123u4u&last_updated_to=12123adfasdf123u4u&items=12123adfasdf123u4u&limit=12123adfasdf123u4u&offset=12123adfasdf123u4u' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
    //const {external_pos_id} = req.params;
		const options = {
			host: 'api.mercadopago.com',
			path: `/merchant_orders/search`,
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

export const merchantOrdersCtrl = new merchantOrdersControler();