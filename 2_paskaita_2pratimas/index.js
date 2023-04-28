const express = require("express");
const cors = require('cors');
const app = express(); 
const port = 3000; 

const products = [];

app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
    res.send(products); 
});

app.post("/products", (req, res) => {
    const product = req.body.product;
    products.push(product);
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});