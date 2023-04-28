const express = require("express"); // exspress modulio importavimas
const cors = require('cors');
const app = express(); // aplikacijos sukurimas
const port = 3000; // port kanalo skaicius

const names = ['Raimis'];
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(names); 
});

app.post("/", (req, res) => {
    const name = req.body.name;
    names.push(name);
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});