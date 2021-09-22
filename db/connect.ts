import { Db, MongoClient } from "mongodb";
import { google } from "googleapis";

global.mongo = global.mongo || {};

export const connectToDB = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    });
    console.log("connecting to DB");
    await global.mongo.client.connect();
    console.log("DB is now connected");
  }
  const db: Db = global?.mongo?.client?.db("edc-schools");
  return { db, dbClient: global.mongo.client };
};

const credentials = {
  private_key: process.env.private_key,
  client_email: process.env.client_email,
};

export async function googleDrive() {
  const client = await google.auth.getClient({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  return google.drive({
    version: "v3",
    auth: client,
  });
}
