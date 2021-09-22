import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
});

async function connect() {
  if (!client.isConnected()) await client.connect();
  const db = client.db("edc-schools");
  return { db, client };
}

export { connect };
