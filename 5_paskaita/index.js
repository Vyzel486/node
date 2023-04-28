const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.get("/", (req, res) => {
  res.send(users);
});

app.post("/", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send(user);
})

app.listen(port, () => console.log(`Server is running on the http://localhost:${port}/`));