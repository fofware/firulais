import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
export default class Server {

	public app: Application;

	constructor() {
		this.app = express()
		this.config();
		this.routes();
	}
	config(): void {
//		this.app.set('port', process.env.PORT || 3000);
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(passport.initialize());
//		passport.use(passportMiddelware);
		this.app.disable('etag');
	}
	routes(): void {
		this.app.get('/', (req: Request, res: Response) => {
			res.send(`esta es la nueva api`);
		});
/*
		this.app.use( indexRoutes );
		this.app.use( '/api', peoplesRoutes );
		this.app.use( '/api/plus', plusRoutes );
		this.app.use( '/api', articulosRt );
		this.app.use( '/api', productoCtrl.router );
		this.app.use( ProveedoresArticulosCtrl.router );
		this.app.use( personaCtrl.router );
		this.app.use( userCtrl.router );
		this.app.use( mongoCtrl.router );
		this.app.use( cajaCtrl.router );
		this.app.use( comprobanteCtrl.router );
		this.app.use( fullDataCtrl.router );
  */
 	}
	start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log("Server Run at port", this.app.get('port'));
		});
	}
}
