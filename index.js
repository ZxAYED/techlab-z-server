require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app =express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@clusterz.ulyhy8v.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch{
    (console.dir)}
}
run()

app.get("/", (req, res) =>
 res.send("techLab is running..."));


 app.listen(port, () => {
    console.log(`techLab is Running on port ${port}`)});
  