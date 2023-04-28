const express = require("express"); // exspress modulio importavimas
const app = express(); // aplikacijos sukurimas
const port = 3000; // port kanalo skaicius

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// serverio paleidimas
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const casual = require('casual'); // casual modulio importavimas

app.get('/randomUser', (req, res) => {
    const randomUser = {
        name: casual.first_name,
        surname: casual.last_name,
        country: casual.country,
        city: casual.city,
        street: casual.street,
        zipCode: casual.zip(digits = (5, 9)),
    };
    res.send(randomUser);
});

app.get('/randomColor', (req, res) => {
    res.send(casual.rgb_hex);
});

app.get('/randomColors', (req, res) => {
    const randomColors = []
    for(let i =0; i < 5; i++){
        randomColors.push(casual.color_name)
    }
    res.send(randomColors);
});

app.get('/randomPlaces', (req, res) => {
    const places = [];
    const randomNum = Math.floor(Math.random() * 5)+1;
    for(let i = 0; i < randomNum; i++){
        randomPlaces = {
            country: casual.country,
            city: casual.city,
            address: casual.address
        }
        places.push(randomPlaces)
    }
    res.send(places);
});