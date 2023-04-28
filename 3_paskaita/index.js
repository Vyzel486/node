const express = require("express");
const cors = require('cors');
const app = express(); 
const port = 3000; 

const persons = [];

app.use(cors());
app.use(express.json());

app.get("/regForm", (req, res) => {
    res.send(persons); 
});

app.post("/regForm", (req, res) => {
    const person = 
    {
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        postCode: req.body.postCode,
        city: req.body.city,
        phone: req.body.phone,
    };
    persons.push(person);
    res.send(persons);
});

// isiginlinti kaip veikia
app.post("/login", (req, res) => {
    // req.body = {email: "rokas@gmail.com", password: "rokas123"}
    //
    let foundedUser = persons.find((user) => user.email === req.body.email);
    // jeigu randa foundedUser = {email: "rokas@gmail.com", password: "rokas123", ...}
    // jeigu neranda foundedUser = undefined
    if (foundedUser !== undefined) {
      // rado
      let submittedPassword = req.body.password; // test
      let storedPassword = foundedUser.password; // test
      // test === test
      // rokas123 === rokas123!
      if (submittedPassword === storedPassword) {
        res.send({ message: "Sekmingai prisijungete", approved: true });
      } else {
        res.send({ message: "Neteisingas slaptažodis", approved: false });
      }
    } else {
      // nerado
      res.send({
        message: "Neteisingas el. paštas",
        approved: false,
      });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on the http://localhost:${port}/regForm`);
});