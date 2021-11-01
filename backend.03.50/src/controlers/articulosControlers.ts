/*
import MongoClient from 'mongodb';

// Connection url
const url = 'mongodb://192.168.100.150:27044';
// Database Name
const dbName = 'gestion';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  // Create a collection we want to drop later
  const col = client.db(dbName).collection('createIndexExample1');
  // Show that duplicate records got dropped
  col.find({}).toArray(function(err, items) {
    expect(err).to.not.exist;
    test.equal(4, items.length);
    client.close();
  });
});
*/
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
export class dbMongoCollection {
  url = process.env.MONGO_URL || 'mongodb://192.168.100.150:27044';
  dbName = process.env.MONGO_DATABASE || 'gestion';
  extra = {};
  collection = "";
	constructor(collection:string, dbName?:string, url?:string) {
    await
    this.extra[collection] = this.collection;
	}
  
  async config(collection) {

  }
  
  public get value() : string {
    return this.extra[value]
  }
    
}
