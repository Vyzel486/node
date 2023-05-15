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
      .collection('Users')
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
    const data = await con.db('MyDataBase').collection('Users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .countDocuments();
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersCount/Jonas', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .countDocuments({ name: 'Jonas Petravicius' });
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/cities', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .distinct('city');
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/lowestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .aggregate([{ $sort: { income: -1 } }])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/highestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .aggregate([{ $sort: { income: 1 } }])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/dynamicUsersCount/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .countDocuments({ name });
    await con.close();
    // data = 10
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .insertMany([
        {
          name: 'Jonas Jonaitis',
          email: 'jonas.jonaitis@example.com',
          city: 'Vilnius',
          income: 5500,
        },
        {
          name: 'Petras Petraitis',
          email: 'petras.petraitis@example.com',
          city: 'Kaunas',
          income: 2500,
        },
        {
          name: 'Ona Onaitiene',
          email: 'ona.onaitiene@example.com',
          city: 'Klaipeda',
          income: 3500,
        },
        {
          name: 'Jonas Petravicius',
          email: 'jonas.petravicius@example.com',
          city: 'Vilnius',
          income: 2200,
        },
        {
          name: 'Janina Jonaitiene',
          email: 'janina.jonaitiene@example.com',
          city: 'Panevezys',
          income: 4300,
        },
        {
          name: 'Azuolas Medaitis',
          email: 'azuolas.medaitis@example.com',
          city: 'Siauliai',
          income: 1500,
        },
        {
          name: 'Jonas Pilypukas',
          email: 'jonas.pilypukas@example.com',
          city: 'Vilnius',
          income: 2575,
        },
        {
          name: 'Liepa Liepaite',
          email: 'liepa.liepaite@example.com',
          city: 'Siauliai',
          income: 3945,
        },
        {
          name: 'Vasaris Klevaitis',
          email: 'vasaris.klevaitis@example.com',
          city: 'Kaunas',
          income: 4230,
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
