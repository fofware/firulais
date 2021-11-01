import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys } from "../config/mpKey";

const Authorization = `Bearer ${mpKeys.AccessToken}`;

class storesControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/stores',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
  }

	async list(req: Request, res: Response) {
		/*
		curl -X GET \
    'https://api.mercadopago.com/users/{user_id}/stores/search?external_id=SUC001' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
		const options = {
			host: 'api.mercadopago.com',
			path: `/users/${mpKeys.userId}/stores/search`,
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

export const storesCtrl = new storesControler();