// { rating: 1 } - 1 didėjimo tvarka; { rating: -1 } - -1 mažėjimo tvarka
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

app.get('/movies', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Movies')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params; // destrukcija is objekto
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Movies')
      .findOne(new ObjectId(id));
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/movies/genre/:title', async (req, res) => {
  try {
    const { title } = req.params; // destrukcija is objekto
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Movies')
      .find({ genre: title }) // randa pagal tam tikra reiksme - pvz: genre
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// asc - ascending - didejimo tvarka, dsc - descending - mazejimo tvarka
app.get('/movies/ratingSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Movies')
      .find()
      .sort({ rating: sort }) // sortina didejimo/mazejimo tvarka
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/movies', async (req, res) => {
  try {
    const movie = req.body;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Movies')
      .insertOne(movie);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () =>
  console.log(`Server is running on the http://localhost:${port}/`),
);
