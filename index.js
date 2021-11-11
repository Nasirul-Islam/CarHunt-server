const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// username: process.env.DB_USER
// password: process.env.DB_PASS

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.la6rz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("carhunt");
    const productsCollection = database.collection("products");
    const ordersCollection = database.collection("orders");
    const reviewCollection = database.collection("review");
    const usersCollection = database.collection("users");

    // POST API
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.json(result);
    });
    // POST API
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.json(result);
    });
    // GET API
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find({}).toArray();
      res.json(result);
    });
    // GET API
    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.json(result);
    });
    // POST API
    app.post("/order", async (req, res) => {
      const product = req.body;
      const result = await ordersCollection.insertOne(product);
      res.json(result);
    });
    // GET API
    app.get("/order", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await ordersCollection.find(query).toArray();
      res.json(result);
    });
    // DELETE API
    app.delete("/cancel/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await ordersCollection.deleteOne(query);
      res.json(result);
    });
    //
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Running server at http://localhost:${port}`);
});
