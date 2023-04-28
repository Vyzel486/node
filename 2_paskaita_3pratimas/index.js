const express = require("express");
const cors = require('cors');
const app = express(); 
const port = 3000; 

const products = [];

app.use(cors());
app.use(express.json());

app.get("/productsAndPrice", (req, res) => {
    res.send(products); 
});

app.post("/productsAndPrice", (req, res) => {
    const product = {name: req.body.name, price: req.body.price};
    products.push(product);
    res.send(product);
});

app.listen(port, () => {
    console.log(`Server is running on the http://localhost:${port}/productsAndPrice`);
});