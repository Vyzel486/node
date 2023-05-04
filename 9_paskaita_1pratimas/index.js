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

app.get('/books', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newBooks')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newBooks')
      .findOne(new ObjectId(id));
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/books/genre/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newBooks')
      .find({ genre: title })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/books/ratingSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newBooks')
      .find()
      .sort({ rating: sort })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/books', async (req, res) => {
  try {
    const book = req.body;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newBooks')
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
