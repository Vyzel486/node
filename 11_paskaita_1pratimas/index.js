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

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newUsers')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/addUser', async (req, res) => {
  try {
    const user = req.body;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newUsers')
      .insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/comments', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Comments')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Comments')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Comments')
      .insertMany([
        {
          date: new Date(),
          comments: 'siandien reikia atlikti daug darbu',
          user_id: new ObjectId(id),
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/allUsers', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('newUsers')
      .insertMany([
        {
          name: 'Kendyll Smith',
          email: 'kendyll.smith@example.com',
        },
        {
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
        },
        {
          name: 'Charlie Brown',
          email: 'charlie.brown@example.com',
        },
        {
          name: 'David Lee',
          email: 'david.lee@example.com',
        },
        {
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
        },
        {
          name: 'Frank Rodriguez',
          email: 'frank.rodriguez@example.com',
        },
        {
          name: 'Grace Kim',
          email: 'grace.kim@example.com',
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () =>
  console.log(`Server is running on the http://localhost:${port}/`),
);
