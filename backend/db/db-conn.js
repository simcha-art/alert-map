import { MongoClient } from "mongodb";
import env from "dotenv";

env.config();

const MONGODB_LONG_URI = process.env.MONGODB_LONG_URI;

const client = new MongoClient(MONGODB_LONG_URI);

async function connect() {
    try {
        await client.connect();
        const database = client.db("alerts");
        const collection = database.collection("alerts");
        return collection;
    } catch (error) {
        console.log(error);
        await client.close();
    }
}

export {connect}
