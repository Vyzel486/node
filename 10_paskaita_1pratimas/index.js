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
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
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
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
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
      .distinct('city'); // grąžina unikalias reikšmes, būtinai reikia nurodyti kriterijų t.y. raktą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/lowestIncome', async (req, res) => {
  // total amount of money spent by each customer - kiek kiekvienas asmuo išleido pinigų
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .aggregate([{ $sort: { income: -1 } }])
      .toArray();
    // $group - sugrupuoja, _id: $customer - naudoja unikalų customerį,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/highestIncome', async (req, res) => {
  // total amount of money spent by each customer - kiek kiekvienas asmuo išleido pinigų
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .aggregate([{ $sort: { income: 1 } }])
      .toArray();
    // $group - sugrupuoja, _id: $customer - naudoja unikalų customerį,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get('/dynamicUsersCount/:name', async (req, res) => {
//   // total amount of money spent on each liquid product
//   try {
//     const { name } = req.params;
//     const con = await client.connect();
//     const data = await con
//       .db('MyDataBase')
//       .collection('Users')
//       .aggregate([
//         { $match: { name: { $in: ['Jonas'] } } },
//         { $group: { _id: name, total: { $sum: name } } },
//       ])
//       .toArray();
//     // $match - atitikmenys,
//     // {product:{ $in:['shampoo', 'conditioner',
// 'mouthwash']}} žiūrima per product; išvardintuose
//     // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
//     // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
//     // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.get('/dynamicUsersCount/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDataBase')
      .collection('Users')
      .countDocuments({ name });
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
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
