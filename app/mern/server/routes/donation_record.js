import express from "express";

import db from "../database/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

//get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("donations");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});



//get a single record by id
router.get("/test", async (req, res) => {
  
    let collection_campaigns = await db.collection("campaigns");



  let goalCurrentAmount = await collection_campaigns.aggregate([
  {
    $match: {
      url: "feed-the-hungry"
    }
  },
  {
    $project: {
      suma: {
        $reduce: {
          input: "$donations",
          initialValue: 0,
          in: {
            $add: [
              "$$value",
              "$$this.amount"
            ]
          }
        }
      }
    }
  }
]);
const goalCurrentAmount_val = await goalCurrentAmount.next();
  console.log(goalCurrentAmount_val);
  console.log(goalCurrentAmount_val.suma);
  // console.log(goalCurrentAmount.toArray());
  if (!goalCurrentAmount) res.send("Not found").status(404);
  else res.send(goalCurrentAmount).status(200);
});




//get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("donations");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


const generateRandomString = (myLength) => {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

  const ProcessTransaction = (campaignID , cardNumber  , cvv   , amount    , donorName    , donorEmail    , userId )  => {
    let transactionID = generateRandomString(5)+'-'+generateRandomString(5)+'-'+generateRandomString(5);
    let lastFour = cardNumber.slice(-5);
    let transaction_storage_result = StoreTransactionID(campaignID , transactionID, lastFour, amount , donorName, donorEmail, userId );
    return transactionID;
}


const StoreTransactionID = (async (campaignID , transactionID , lastFour , amount    , donorName    , donorEmail    , userId )  => {
  try {
    let newDocument = {
      campaignId: campaignID,
      cardNumber: lastFour,
      transactionId: transactionID,
      amount: parseInt(amount),
      donorName: donorName,
      donorEmail: donorEmail,
      userId: userId
    };

    let collection_campaigns = await db.collection("campaigns");
      await collection_campaigns.updateOne(
      { url: campaignID },
      {
        $push: { donations: newDocument}
      }
    );
     


    let goalCurrentAmount = await collection_campaigns.aggregate([
  {
    $match: {
      url: campaignID
    }
  },
  {
    $project: {
      suma: {
        $reduce: {
          input: "$donations",
          initialValue: 0,
          in: {
            $add: [
              "$$value",
              "$$this.amount"
            ]
          }
        }
      }
    }
  }
]);
const goalCurrentAmount_val = await goalCurrentAmount.next();

let curAmountRaised=goalCurrentAmount_val.suma;
      await collection_campaigns.updateOne(
      { url: campaignID },
      {
        $set: { 'currentAmount': curAmountRaised }
      }
    );




    let collection = await db.collection("donations");
    let result = await collection.insertOne(newDocument);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
  
})

//create a new record.
router.post("/", async (req, res) => {
  try {





    let result_transactionID = ProcessTransaction(req.body.url_slug , req.body.cardNumber  , req.body.cvv   , req.body.amount    , req.body.donorName    , req.body.donorEmail    , req.body.userId )
    if(result_transactionID){
      res.send("Transaction saved with transactionID: "+result_transactionID).status(204);


    }else{      
      res.status(400).send("Error Creating donation");

    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding donation");
  }
});

//update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("donation");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating donation");
  }
});

//delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("donation");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting donation");
  }
});

export default router;