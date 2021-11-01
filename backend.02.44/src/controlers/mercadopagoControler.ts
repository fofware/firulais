import {Request, Response, Router} from 'express';
import passport from "passport";
import mercadopago, { configurations, customers } from 'mercadopago'
import ipnreg from '../models/mp_ipn'
import { MercadoPagoResponse } from 'mercadopago/utils/mercadopago-respose';
import { MercadoPagoPreference } from 'mercadopago/resources/preferences';
import mp_preference from '../models/mp_preference';
import https from 'https';
import { mpKeys, mpKeysProd } from '../common/mpKey';
const Authorization = `Bearer ${mpKeys.AccessToken}`;

mercadopago.configure({
  access_token: mpKeys.AccessToken,
  integrator_id: mpKeys.integrator_id
});

class MPControler {

	public router: Router = Router();
	constructor() {
		this.config();
	}

	config () {
    //Notificaciones de Mercado pago
    this.router.post('/mp/ipn/',
      //passport.authenticate('jwt', {session:false}), 
      this.ipnsave );

    this.router.get('/mp/ipn/',
      //passport.authenticate('jwt', {session:false}), 
      this.ipnlist );

    this.router.get('/mp/rpta/',
      //passport.authenticate('jwt', {session:false}), 
      this.rptaget );
    this.router.post('/mp/rpta/',
      //passport.authenticate('jwt', {session:false}), 
      this.rptapost );
    // Preferencias de Mercado Pago (No entiendo bien de que se tratan)
    // se pueden usar para generar un proceso de pago en la página de Mercado Mago
    this.router.post('/mp/preferencias/add',
      //passport.authenticate('jwt', {session:false}), 
      this.preferencesAdd );
    this.router.get('/mp/preferencia/',
      //passport.authenticate('jwt', {session:false}), 
      this.preferenciaList );
    // Documentos
    this.router.get('/mp/documentos/',
      //passport.authenticate('jwt', {session:false}), 
      this.documentosList );
    // Medios de Pagos
    this.router.get('/mp/mediosdepago/',
      //passport.authenticate('jwt', {session:false}), 
      this.mediosdepagoList );
    //Sucursales
    this.router.get('/mp/customers/',
      //passport.authenticate('jwt', {session:false}), 
      this.customersList );
    this.router.get('/mp/customers/add',
      //passport.authenticate('jwt', {session:false}), 
      this.customerAdd );
    //Merchant_orders
    this.router.get('/mp/merchant_orders/',
      //passport.authenticate('jwt', {session:false}), 
      this.merchant_orders );
    //Pagos
    this.router.get('/mp/pagos',
      //passport.authenticate('jwt', {session:false}), 
      this.pagoslist );
    this.router.get('/mp/pagos/limit/:limit/offset/:offset',
      //passport.authenticate('jwt', {session:false}), 
      this.pagoslist );

  }

	async documentosList(req: Request, res: Response) {
		/*
		curl -X GET \
    'https://api.mercadopago.com/v1/identification_types' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
		*/
		const options = {
			host: 'api.mercadopago.com',
			path: '/v1/identification_types',
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${mpKeys.AccessToken}`
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
	async mediosdepagoList(req: Request, res: Response) {
		/*
		curl -X GET \
    'https://api.mercadopago.com/v1/identification_types' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
		*/
		const options = {
			host: 'api.mercadopago.com',
			path: '/v1/identification_types',
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${mpKeys.AccessToken}`
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

  async preferenciaList(req: Request, res: Response) {
	/*
   curl -X GET \
   'https://api.mercadopago.com/checkout/preferences/search?sponsor_id=undefined&external_reference=undefined&site_id=undefined&marketplace=undefined' \
   -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
   */
	  const options = {
	  	host: 'api.mercadopago.com',
	  	//path: '/checkout/preferences/search?external_reference=REeFerencIA%20que%20Le%20Mando%20Al%20Iniciar%20el%20proceso%20de%20cobro%20y%20Puedo%20Usar',
	  	path: '/checkout/preferences/search?offset=20',
	  	method: 'GET',
	  	headers: {
				'Authorization': `Bearer ${mpKeys.AccessToken}`
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
  // Customers
  async customersList(req: Request, res: Response): Promise<void> {
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
				'Authorization': `Bearer ${mpKeys.AccessToken}`
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
  async customerLeer(req: Request, res: Response): Promise<void> {
    try {
      //const newReg = await ;
      const {id} = req.params;
      const rpta = mercadopago.customers.findById(id);
      res.status(200).json({rpta});
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
  async customerAdd(req: Request, res: Response): Promise<void> {
    try {
      //const newReg = await ;
      const {id} = req.params;
      const customer = {
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
          "street_number": "123"
        },
        "date_registered": "2000-01-18",
        "description": "Description del user",
        "default_card": "None"
      }
      const rpta = mercadopago.customers.create(customer);
      res.status(200).json({rpta});
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
  // Preferences
  async preferenciaCreate(req: Request, res: Response): Promise<void> {
    const preference = {
      "expires": false,
      "external_reference": "REeFerencIA que Le Mando Al Iniciar el proceso de cobro y Puedo Usar",
      "items": [
        {
          "id": "IddelProducto",
          "category_id": "cat123",
          "currency": "ARS",
          "description": "7 Vidas Wet Salmón Lata de 340 Gr",
          "picture_url": "https://firulais.net.ar/assets/images/alican/7vidas/7vidas-salmonweb.png",
          "title": "Dummy Title",
          "quantity": 2,
          "unit_price": 210
        },
        {
          "id": "IddelProducto2",
          "category_id": "cat123",
          "currency": "ARS",
          "description": "7 Vidas Wet Carne Lata de 340 Gr",
          "picture_url": "https://firulais.net.ar/assets/images/alican/7vidas/7Vidas_Wet_Carne.png",
          "title": "Dummy Title",
          "quantity": 3,
          "unit_price": 210
        }
      ],
      "marketplace": "NONE",
      "marketplace_fee": 0,
      "metadata": {},
      //"notification_url": null,
      "operation_type": "regular_payment",
      "statement_descriptor": "Firulais Tienda para Mascotas",
/*
      "payer": {
        "phone": {
          "area_code": "",
          "number": ""
        },
        "address": {
          "zip_code": "",
          "street_name": "",
          "street_number": null
        },
        "email": "",
        "identification": {
          "number": "",
          "type": ""
        },
        "name": "",
        "surname": "",
        "date_created": null,
        "last_purchase": null
      },

      "payment_methods": {
        "default_card_id": null,
        "default_payment_method_id": null,
        "excluded_payment_methods": [
          {
            "id": ""
          }
        ],
        "excluded_payment_types": [
          {
            "id": ""
          }
        ],
        "installments": null,
        "default_installments": null
      },
*/
      "processing_modes": null,
      "product_id": null,
      "redirect_urls": {
        "failure": "",
        "pending": "",
        "success": ""
      },
      //"auto_return": "all",
      "back_urls": {
        "success": "https://firulais.net.ar/mp/rpta",
        "failure": "https://firulais.net.ar/mp/rpta",
        "pending": "https://firulais.net.ar/mp/rpta"
        //"success": "https://firulais.net.ar/mp/rpta/success",
        //"failure": "https://firulais.net.ar/mp/rpta/failure",
        //"pending": "https://firulais.net.ar/mp/rpta/pending"
      }
    }
    try {
      //const newReg = await ;
      const rpta:any = await mercadopago.preferences.create( preference )
      const newReg = new mp_preference(rpta);
			const result = await newReg.save();
      res.status(200).json({newReg,result});
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
  preferencesAdd(req: Request, res: Response) {
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
        'Authorization': `Bearer ${mpKeys.AccessToken}`,
        'Content-Type': 'application/json',
        'x-integrator-id': 'dev_24c65fb163bf11ea96500242ac130004',
      }
    };
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

	/*
  async ipnsaveg(req: Request, res: Response): Promise<void> {
    try {
      req.body.viene = "GET";
			const newReg = new ipnreg(req.body);
      console.log(req.body);
      console.log(req.params);
			await newReg.save();
      res.status(200).json({newReg, data:req.body});
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  }
  */
	async ipnsave(req: Request, res: Response): Promise<void> {
    try {
			const newReg = new ipnreg(req.body);
			const result = await newReg.save();
      res.status(200).json({newReg,result});
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  }
	async ipnlist(req: Request, res: Response): Promise<void> {
    try {
			const result = await ipnreg.find();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  }


	async merchant_orders(req: Request, res: Response): Promise<void> {
    try {
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
				'Authorization': `Bearer ${mpKeysProd.AccessToken}`
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
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  }


  async rptaget(req: Request, res: Response): Promise<void> {
    try {
      const newReg = req.params ;
      res.status(200).json(newReg);
    } catch (error) {
      res.status(200).json(error);
    }
  }
	async rptapost(req: Request, res: Response): Promise<void> {
    try {
      const newReg = req.body;
      res.status(200).json(newReg);
    } catch (error) {
      res.status(200).json(error);
    }
  }

	async pagoslist(req: Request, res: Response) {
		/*
    curl -X GET \
    'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=ID_REF' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' 
    */
    console.log(req.params.external_reference);

    const external_reference = req.params.external_reference
    console.log(external_reference);

    const offset = req.params.offset || 0;
    const limit = req.params.limit || 20;
		const options = {
			host: 'api.mercadopago.com',
			path: `/v1/payments/search?sort=date_created&criteria=desc&offset=${offset}&limit=${limit}`,
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${mpKeysProd.AccessToken}`,
        'x-integrator-id': `${mpKeysProd.integrator_id}`
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

export const MercadoPagoCtrl = new MPControler();