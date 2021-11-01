import fs from 'fs';
import http from 'http';
import https from 'https';
//import Server from './app';
//import './databaseMongoose';
import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
const wAppStoredSession = './whatsappsession.json';
//const { MongoClient } = require('mongodb');
// or as an es module:
import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://192.168.100.150:27050';
const dbclient = new MongoClient(url);

// Database Name
const dbName = 'whatsapp';

async function writeMsg(msg:any) {
  // Use connect method to connect to the server
  await dbclient.connect();
  const db = dbclient.db(dbName);
  const collection = db.collection('messages');
  const findResult = await collection.insertOne(msg);
  console.log('Nuevo mensaje =>', findResult);
  // the following code examples can be pasted here...
  return findResult
}

async function writeSession(msg:any) {
  // Use connect method to connect to the server
  await dbclient.connect();
  console.log('Connected successfully to server');
  const db = dbclient.db(dbName);
  const collection = db.collection('sessions');
  const findResult = await collection.insertOne(msg);
  console.log('Found documents =>', findResult);
  // the following code examples can be pasted here...
}

async function leerSession(): Promise<any> {
  let session;
  try {
    await dbclient.connect();
    const database = dbclient.db("whatsapp");
    // Specifying a Schema is always optional, but it enables type hinting on
    // finds and inserts
    const sessions = database.collection("sessions");
    session = await sessions.findOne({});
/*
      { _id: "The Room" },
      {
        sort: { rating: -1 },
        projection: { _id: 0, title: 1, imdb: 1 },
      }
    );
*/
  } finally {
    await dbclient.close();
    session ? oldSession(session) : newSession();
  }
}

let WApp:Client;
const newSession = () => {
  WApp = new Client({});

  WApp.on('qr', qr => {
    qrcode.generate( qr, {small: true});
  });

  WApp.on('authenticated', session => {
    writeSession(session);
    console.log("WhatsApp Authenticated");
    listenWAmessage();
  });

  WApp.initialize();

}

const oldSession = (sess:any) => {
  
  const session = {
    WABrowserId: sess.WABrowserId,
    WASecretBundle: sess.WASecretBundle,
    WAToken1: sess.WAToken1,
    WAToken2: sess.WAToken2
  }
  
  console.log(session);

  WApp = new Client({session:session});

  WApp.on('ready', () => {
    console.log("WhatsApp Ready");
    listenWAmessage();
  })
  
  WApp.on('auth_failure', err => {
    console.error('auth_failure');
    console.error(err);
  });

  WApp.initialize();

}

const listenWAmessage = () => {
  WApp.on('message', async (msg:any) => {
    console.log(msg);
    // aca debe grabar el mensaje
    writeMsg(msg);
  });
}

const sess = leerSession();


//fs.existsSync(wAppStoredSession) ? oldSession() : newSession();


/*
console.log(sessionData);

WApp = new Client({
  session: sessionData
});
WApp.initialize();
WApp.on('qr', qr => {
  qrcode.generate( qr, {small: true});
});

WApp.on('ready', () => {
  console.log('WhatsApp Conectado');
});


WApp.on('auth_failure', err => {
  console.error(err);
});
*/
//import specialRotes from './routes/specialRoutes';
//const srv = new Server();
//server.app.use(authRoutes);
//server.app.use(specialRotes);
//server.start();
//console.log(process.env)
/*
try {
	const privateKey = fs.readFileSync('/etc/letsencrypt/live/firulais.net.ar/privkey.pem', {encoding:'utf8', flag:'r'});
	const certificate = fs.readFileSync('/etc/letsencrypt/live/firulais.net.ar/cert.pem', {encoding:'utf8', flag:'r'});
	const ca = fs.readFileSync('/etc/letsencrypt/live/firulais.net.ar/web.pem', {encoding:'utf8', flag:'r'});
	
	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	};
	const httpsServer = https.createServer(credentials, srv.app);
	httpsServer.listen(3443, () => {
		console.log('HTTPS Server running on port 3443');
	});
			
} catch (error) {
	console.log(error);	
}
*/
// Starting both http & https servers
//const httpServer = http.createServer(srv.app);

/*
httpServer.listen(4400, () => {
	console.log('HTTP Server running on port 4400');
});
*/
