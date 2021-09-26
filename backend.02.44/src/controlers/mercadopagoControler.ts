import {Request, Response, Router} from 'express';
import passport from "passport";
import mercadopago from 'mercadopago'
import ipnreg from '../models/mp_ipn'
import { MercadoPagoResponse } from 'mercadopago/utils/mercadopago-respose';
import { MercadoPagoPreference } from 'mercadopago/resources/preferences';
import mp_preference from '../models/mp_preference';

mercadopago.configure({
  access_token: 'TEST-3527848825753216-092312-ea8b6370ee241c138f64f12278d07bfa-84242924'
})

/*
curl -X POST \
    'https://api.mercadopago.com/checkout/preferences' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
    -H 'Content-Type: application/json' \
    -d ''
*/
class MPControler {

	public router: Router = Router();
	constructor(private http: HttpClient) {
		this.config();
	}

	config () {
    //Notificaciones de Mercado pago
    this.router.post('/mp/ipn/',
      //passport.authenticate('jwt', {session:false}), 
      this.ipnsave );

    this.router.get('/mp/rpta/',
      //passport.authenticate('jwt', {session:false}), 
      this.rptaget );
    this.router.post('/mp/rpta/',
      //passport.authenticate('jwt', {session:false}), 
      this.rptapost );
    // Preferencias de Mercado Pago (No entiendo bien de que se tratan)
    // se pueden usar para generar un proceso de pago en la página de Mercado Mago
    this.router.get('/mp/preferencia/create',
      //passport.authenticate('jwt', {session:false}), 
      this.preferenciaCreate );
    this.router.get('/mp/preferencia/',
      //passport.authenticate('jwt', {session:false}), 
      this.preferenciaList );
  }

	async preferenciaList(req: Request, res: Response): Promise<void> {
    //const preference = await mercadopago.preferences.get()
    const ipn = mercadopago.ipn();
    console.log(ipn);
    res.status(200).json(ipn);

 	}
   async documentos (req: Request, res: Response){
    const PARAMS = new HttpParams({
      fromObject: {
      action: 'opensearch',
      format: 'json',
      origin: '*'
      }
    });
    try {

      this.http
      .get<[any, string[]]>(WIKI_URL, {params: PARAMS.set('search', term)})
			https://api.mercadopago.com/checkout/preferences/search?sponsor_id=undefined&external_reference=undefined&site_id=undefined&marketplace=undefined
      res.status(200).json(newReg);

		} catch (error) {
			res.status(500).json(error);
		}

   }
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
}

export const MercadoPagoCtrl = new MPControler();