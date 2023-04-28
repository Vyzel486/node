const express = require("express");
const cors = require('cors');
const app = express(); 
const port = 3000; 

app.use(cors());
app.use(express.json());

const cars = [];
app.get("/cars", (req, res) => {
    res.send(cars); 
});

app.post("/", (req, res) => {
    const car = req.body.car;
    cars.push(car);
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on the http://localhost:${port}/`);
});