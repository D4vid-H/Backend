import { config, MongoClient } from "../depts.ts";

const { DATABASE } = await config();
const MONGO_URI = `mongodb+srv://root:root@coderhouse.vi3s2vw.mongodb.net/test`;
const client = new MongoClient();

try {
  await client.connect(MONGO_URI);

  console.log(`Database client connecte to ${MONGO_URI}`);
} catch (err) {
  console.log(err);
}

const db = client.database(DATABASE);

export default db;
