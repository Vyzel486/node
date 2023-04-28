const express = require("express"); // exspress modulio importavimas
const app = express(); // aplikacijos sukurimas
const port = 3000; // port kanalo skaicius

// routas (path/route) kelias
// get - grazink duomenis
app.get("/", (request, response) => {
    // req - kas ateina is isores
    // res - kas ateina is vidaus
    response.send("Mano vardas yra Raimis");// send metodas issiuncia duomenis
});

app.get('/today', (req, res) => {
    res.send(new Date().toDateString());
});

app.get('/user', (req, res) => {
    const user = {
        name: "Raimis",
        surname: "Matuliauskas",
        age: 39
    };
    res.send(user);
});

// serverio paleidimas
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});