import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


// Models

import {Donation} from './models/Donation.js';
import {User} from './models/User.js';
import {Message} from './models/Message.js';
import {Campaign} from './models/Campaign.js';


try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Ping. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("giving_network");

export default db;