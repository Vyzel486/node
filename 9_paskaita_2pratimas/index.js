const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Products')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Products')
      .findOne(new ObjectId(id));
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Products')
      .find({ category: category })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/priceSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Products')
      .find()
      .sort({ price: sort })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/products', async (req, res) => {
  try {
    const book = req.body;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Products')
      .insertOne(book);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () =>
  console.log(`Server is running on the http://localhost:${port}/`),
);
