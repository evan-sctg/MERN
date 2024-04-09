import express from "express";

import db from "../database/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("campaigns");
  let results = await collection.find({}).toArray();




  res.send(results).status(200);
});


router.get("/:url_slug", async (req, res) => {
  let collection = await db.collection("campaigns");
  let query = { url: req.params.url_slug };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


router.get("/id/:id", async (req, res) => {
  let collection = await db.collection("campaigns");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


router.post("/", async (req, res) => {
  try {
    let newDocument = {
  url: req.body.url,
  title: req.body.title,
  description: req.body.description,
  goalAmount: req.body.goalAmount,
  currentAmount: req.body.currentAmount,
  imageUrl: req.body.imageUrl,
  youtubeUrl: req.body.youtubeUrl,
  startDate: req.body.startDate,
  endDate: req.body.endDate,
  ownerId: req.body.ownerId,
  donations: req.body.donations,
  createdDate: Date.now,
};
    let collection = await db.collection("campaigns");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("campaigns");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating campaign");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("campaigns");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting campaign");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("campaigns");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting campaign");
  }
});

export default router;