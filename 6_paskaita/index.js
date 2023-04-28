// dazniausiai naudojamos aplinkos:
// development (pas mus), testint, prerpod (pries paskutine versija),
// production(galutine versija kuria mato visi klientai).

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send();
});

app.listen(port, () =>
  console.log(`Server is running on the http://localhost:${port}/`),
);
