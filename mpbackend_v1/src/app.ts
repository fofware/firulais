import express, { Application, NextFunction } from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';


import passport from 'passport';
import passportMiddelware from './middlewares/passport';
import { userCtrl } from './controlers/userController';
import authRoutes from './routes/authRoutes';
import { documentosCtrl } from './controlers/documentos';
import { preferenciaCtrl } from './controlers/preferencias';

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
		passport.use(passportMiddelware);
	  this.app.disable('etag');
	}
	routes(): void {
	
		this.app.use(authRoutes);
		this.app.use( userCtrl.router );
    this.app.use( documentosCtrl.router );
    this.app.use( preferenciaCtrl.router )
	}
	start(): void {
		this.app.listen(this.app.get('port'), () => {
			console.log("Server Run at port", this.app.get('port'));
		});
	}
}

