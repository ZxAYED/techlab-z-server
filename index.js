require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const productsCollection = client.db('secure-protection').collection('products');
    const brands = client.db('secure-protection').collection('brands');
    const users = client.db('secure-protection').collection('users');
    const branditems = client.db('secure-protection').collection('branditems');
    app.post('/newproduct',async(req,res)=>{
      const newproduct=req.body;
      console.log(newproduct);
      const result =await productsCollection.insertOne(newproduct)
      res.send(result)
    })
    app.get('/newproduct',async(req,res)=>{
      
      const result =await productsCollection.find().toArray()
      res.send(result)
     
    })
    app.get('/brandProducts',async(req,res)=>{
      const reuslt =await brands.find().toArray()
      res.send(reuslt)
    })
    app.get('/brandProducts/:id',async(req,res)=>{
      const id =req.params.id
    
      const query = { _id:  (id)};
      console.log(query);
      const reuslt =await branditems.findOne(query)
      res.send(reuslt)
      console.log(reuslt);
    })
    app.delete('/newproduct/:id',async(req,res)=>{
      const id=req.params.id;
      const query ={_id:new ObjectId(id)}
      const result =await productsCollection.deleteOne(query);
      res.send(result)
    })
    app.post('/users',async(req,res)=>{
      const user =req.body;
      const result =await users.insertOne(user)
      res.send(result)
    })


    await client.connect();
    

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
  