import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys } from "../config/mpKey";

const Authorization = `Bearer ${mpKeys.AccessToken}`;

class cardsControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/cards/:customer_id',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
  }

	async list(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/v1/customers/{customer_id}/cards' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
    const {customer_id} = req.params;
		const options = {
			host: 'api.mercadopago.com',
			path: `/v1/customers/${customer_id}/cards`,
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

export const cardsCtrl = new cardsControler();