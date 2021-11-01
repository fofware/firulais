import { Request, Response, Router } from "express";
import https from 'https';
import { mpKeys } from "../config/mpKey";
/*
import { ExtractJwt } from "passport-jwt";
import jwt from 'jsonwebtoken';
import config from '../config/config';
import passport from "passport";
import { ObjectID } from 'bson'
*/
const Authorization = `Bearer ${mpKeys.AccessToken}`;

class customersControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/customers',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
    this.router.get('/customers/add',
      //passport.authenticate('jwt', {session:false}), 
      this.add );
  }

	async list(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/v1/customers/search?email=jhon@doe.com' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
		const options = {
			host: 'api.mercadopago.com',
			path: '/v1/customers/search',
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
  add(req: Request, res: Response) {
    /*
      curl -X POST \
        'https://api.mercadopago.com/v1/customers' \
        -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
        -H 'Content-Type: application/json' \
        -d '{
      "email": "jhon@doe.com",
      "first_name": "Jhon",
      "last_name": "Doe",
      "phone": {
        "area_code": "55",
        "number": "991234567"
      },
      "identification": {
        "type": "CPF",
        "number": "12345678900"
      },
      "default_address": "Home",
      "address": {
        "id": "123123",
        "zip_code": "01234567",
        "street_name": "Rua Exemplo",
        "street_number": 123
      },
      "date_registered": "2000-01-18",
      "description": "Description del user",
      "default_card": "None"
    }'

    */
    const options = {
      host: 'api.mercadopago.com',
      path: '/v1/customers',
      method: 'POST',
      headers: {
        'Authorization': Authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    };
    const requestData = {
      "email": "jhon@midoe.com",
      "first_name": "Jhon",
      "last_name": "Doe",
      "phone": {
        "area_code": "55",
        "number": "991234567"
      },
      "identification": {
        "type": "CPF",
        "number": "12345678900"
      },
      "default_address": "Home",
      "address": {
        "id": "123123",
        "zip_code": "01234567",
        "street_name": "Rua Exemplo",
        "street_number": "123"
      },
      "description": "Description del user",
      "default_card": "None"
    }
    const request = https.request(options, (ret) => {
      if (ret.statusCode !== 201) {
        console.error(`Did not get a Created from the server. Code: ${ret.statusCode}`);
        //console.log(ret)
        res.status(200).json({ code: ret.statusCode, msg: ret.statusMessage });
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
    });
    request.write(JSON.stringify(requestData));
    request.end();
    request.on('error', (err) => {
      console.error(`Encountered an error trying to make a request: ${err.message}`);
      res.status(200).json(JSON.parse(`Encountered an error trying to make a request: ${err.message}`));
    });
  
  }

}

export const customersCtrl = new customersControler();