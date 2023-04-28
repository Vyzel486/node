const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const products = [];

app.get("/cart", (req, res) => {
  res.send(products);
});

app.get("/cart/item/:id", (req, res) => {
  const id = req.params.id;
  const productId = products.find(item => item.id === +id);
  res.send(productId);
});

app.post("/cart", (req, res) => {
  const item = req.body;
  products.push(item);
  res.send(item);
})

app.listen(port, () => console.log(`Server is running on the http://localhost:${port}/`));