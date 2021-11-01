import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys, mpKeysProd } from "../config/mpKey";

const Authorization = `Bearer ${mpKeysProd.AccessToken}`;

class pagosControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/pagos',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
		this.router.get('/pagos/:external_reference',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
  }

	async list(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=ID_REF' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
    console.log(req.params.external_reference);

    const external_reference = escape(req.params.external_reference)
    console.log(external_reference);
		const options = {
			host: 'api.mercadopago.com',
			path: `/v1/payments/search?sort=date_created&criteria=desc&offset=0&limit=200`,
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

export const pagosCtrl = new pagosControler();