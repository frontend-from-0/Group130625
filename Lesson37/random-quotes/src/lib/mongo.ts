import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_CONNECTION_URL ?? '';
let promise = null;

async function getMongoClient() {
  if (!promise) {
    promise = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    }).connect();
  }
  const client = await promise;
  return client;
}


export async function getDb() {
  const connection = await getMongoClient();
  return connection.db('random-quotes');
}

export enum Collections {
  quotes = 'quotes'
};

