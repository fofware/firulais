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
//const myrequest = async ( options: any ): Promise<any> =>  {
	//const options = {
	//	host: 'api.mercadopago.com',
	//	//path: '/checkout/preferences/search?external_reference=REeFerencIA%20que%20Le%20Mando%20Al%20Iniciar%20el%20proceso%20de%20cobro%20y%20Puedo%20Usar',
	//	path: '/checkout/preferences/search?next_offset=20',
	//	method: 'GET',
	//	headers: {
	//		'Authorization': 'Bearer TEST-3527848825753216-092312-ea8b6370ee241c138f64f12278d07bfa-84242924'
	//	}
	//};

  const Authorization = `Bearer ${mpKeys.AccessToken}`;

class preferenciaControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    this.router.get('/preferencias/',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
    
    this.router.get('/preferencias/offset/:offset',
      //passport.authenticate('jwt', {session:false}), 
      this.list );
    this.router.get('/preferencias/:id',
      //passport.authenticate('jwt', {session:false}), 
      this.leer );
    //this.router.get('/preferencias/add',
    //  //passport.authenticate('jwt', {session:false}), 
    //  this.add );
    this.router.post('/preferencias/add',
      //passport.authenticate('jwt', {session:false}), 
      this.add );
  }

	async list(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/checkout/preferences/search?sponsor_id=undefined&external_reference=undefined&site_id=undefined&marketplace=undefined' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
    const {offset} = req.params || 0
		const options = {
			host: 'api.mercadopago.com',
			//path: '/checkout/preferences/search?external_reference=REeFerencIA%20que%20Le%20Mando%20Al%20Iniciar%20el%20proceso%20de%20cobro%20y%20Puedo%20Usar',
			path: `/checkout/preferences/search?offset=${offset}`,
			method: 'GET',
			headers: {
				'Authorization': Authorization
			}
		};
    
		const request = https.request(options, (ret) => {
			if (ret.statusCode !== 200) {
				console.error(`Did not get an OK from the server. Code: ${ret.statusCode}`);
        //console.log(ret)
        res.status(200).json({code: ret.statusCode, msg: ret.statusMessage});
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
      res.status(200).json(JSON.parse(`Encountered an error trying to make a request: ${err.message}`));
		});
  }

  leer(req: Request, res: Response){
    /*
    curl -X GET \
    'https://api.mercadopago.com/checkout/preferences/{id}' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
    const {id} = req.params;
    const options = {
			host: 'api.mercadopago.com',
			//path: '/checkout/preferences/search?external_reference=REeFerencIA%20que%20Le%20Mando%20Al%20Iniciar%20el%20proceso%20de%20cobro%20y%20Puedo%20Usar',
			path: `/checkout/preferences/${id}`,
			method: 'GET',
			headers: {
				'Authorization': Authorization
			}
		};
		const request = https.request(options, (ret) => {
			if (ret.statusCode !== 200) {
				console.error(`Did not get an OK from the server. Code: ${ret.statusCode}`);
        //console.log(ret)
        res.status(200).json({code: ret.statusCode, msg: ret.statusMessage});
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
		request.end();
		request.on('error', (err) => {
			console.error(`Encountered an error trying to make a request: ${err.message}`);
      res.status(200).json(JSON.parse(`Encountered an error trying to make a request: ${err.message}`));
		});
  }
  
  add(req: Request, res: Response) {
    /*
    curl -X POST \
    'https://api.mercadopago.com/checkout/preferences' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
    -H 'Content-Type: application/json' \
    -d '{
      "items": [
        {
          "title": "Dummy Title",
          "description": "Dummy description",
          "picture_url": "http://www.myapp.com/myimage.jpg",
          "category_id": "cat123",
          "quantity": 1,
          "currency_id": "U$",
          "unit_price": 10
        }
      ],
      "payer": {
        "phone": {},
        "identification": {},
        "address": {}
      },
      "payment_methods": {
        "excluded_payment_methods": [
          {}
        ],
        "excluded_payment_types": [
          {}
        ]
      },
      "shipments": {
        "free_methods": [
          {}
        ],
        "receiver_address": {}
      },
      "back_urls": {},
      "differential_pricing": {},
      "tracks": [
        {
          "type": "google_ad"
        }
      ]
    }'
    */
    const options = {
      host: 'api.mercadopago.com',
      //path: '/checkout/preferences/search?external_reference=REeFerencIA%20que%20Le%20Mando%20Al%20Iniciar%20el%20proceso%20de%20cobro%20y%20Puedo%20Usar',
      path: '/checkout/preferences/',
      method: 'POST',
      headers: {
        'Authorization': Authorization,
        'Content-Type': 'application/json'
      }
    };
    req.body['integrator_id'] = 'dev_24c65fb163bf11ea96500242ac130004'
    const requestData = req.body;
/*
    {
      "site_id": "MLA",
      "auto_return": "approved",
      "back_urls": {
        "failure": "https://firulais.net.ar/mp/mptesthooks",
        "pending": "https://firulais.net.ar/mp/mptesthooks",
        "success": "https://firulais.net.ar/mp/mptesthooks"
      },
      'items': req.body.items,
      "external_reference": "fofware@gmail.com",
      "binary_mode": false,
      //A. Nombre y Apellido: Lalo Landa
      //B. Email: El email del test-user pagador entregado en este documento.
      //C. Código de área: 11
      //D. Teléfono: 2222333
      "payer": {
        "phone": {
        "area_code": "11",
        "number": "2222333"
        },
        "address": {
        "zip_code": "1111",
        "street_name": "falsa",
        "street_number": "123"
        },
        "email": "Test@user.com",
        "identification": {
        "number": "",
        "type": ""
        },
        "name": "Lalo",
        "surname": "Landa"
      },
      "payment_methods": {
        "excluded_payment_methods": [
          { "id":"amex"}
        ],
        "excluded_payment_types": [
          { 'id':'atm'}
        ],
        'installments': 6,
        'default_installments': 1
      },
    }

    //requestData['items'] = [];
    //for (let i = 0; i < req.body.items.length; i++) {
    //  const element:any = req.body.items[i];
    //  requestData['items'].push( element );
    //}
    //req.body.items.forEach( element => requestData['items'].push(element));
*/
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

export const preferenciaCtrl = new preferenciaControler();