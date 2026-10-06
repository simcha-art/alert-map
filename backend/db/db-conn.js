import { MongoClient } from "mongodb";
import env from "dotenv";

env.config({ path: "db/.env" });

const MONGODB_LONG_URI = process.env.MONGODB_LONG_URI;

const client = new MongoClient(MONGODB_LONG_URI);

async function connect() {
    try {
        await client.connect();
        const database = client.db("alerts");
        const collection = database.collection("alerts");
        const usersCollection = database.collection("users");
        return { collection, usersCollection };
    } catch (error) {
        console.log(error);
        await client.close();
    }
}

const { collection, usersCollection } = await connect();
export { collection, usersCollection };
