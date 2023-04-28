// 1. Sukurkite bendrinį GET route, kuris paduos visus prekių duomenis.
// 2. Sukurkite dinaminį GET route, kur URL turės prekės kategoriją, ir pagal ją prafiltruos,
// bei grąžins tik tuos produktus, kurie priklauso šiai kategorijai.
// 3. Sukurkite dinaminį GET route, kuris priims prekės id ir pagal jį grąžins atitinkamą
// prekės objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės
// konvertuoS.
// 4. Sukurkite GET route, kuris grąžins visų prekių pavadinimus (grąžinamas formatas:
// ["iPhone 13", "Samsung Galaxy S22", "Dell XPS 15", "MacBook Pro", "Sony WH-
// 1000XM4", "Bose QuietComfort 35 II"]).
// 5. Sukurkite GET route, į kurį pasikreipus, grąžins visų prekių, kurių kiekis sandėlyje yra
// mažesnis už nurodytą kiekį, pavadinimus ir likutį (formatas: [{"name": "Samsung
// Galaxy S22", "stock": 5}, {"name": "Dell XPS 15", "stock": 3}]).
// Papildomai:
// 6. Sukurkite dinaminį GET route, kuris pagal kainos intervalą grąžins prekes, kurių kaina yra tarp nurodytų ribų (įskaitant jas). Parametrai turėtų būti perduodami URL kaip minPrice ir maxPrice.(du parametrai reikalingi)
// 7. Sukurkite POST route, kuris leis pridėti naują prekę prie duomenų sąrašo. Nauja prekė turėtų turėti id, name, category, price ir stock laukus. Užtikrinkite, kad naujoji prekė neturėtų to paties id kaip jau esančios prekės.

const express = require("express");
const cors = require("cors");
const data = require("./data");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// 1.
app.get("/", (req, res) => {
    res.send(data);
});

// 2.
app.get("/items/:category", (req, res) => {
    const category = req.params.category;
    const filteredCategories = data.filter(item => item.category.toLowerCase() === category.toLowerCase());
    res.send(filteredCategories);
});

// 3.
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const foundProduct = data.find(item => item.id === +id);
    res.send(foundProduct);
});

// 4.
app.get("/productsNames", (req, res) => {
    const productsNames = data.map(item => item.name);
    res.send(productsNames);
});

// 5.
app.get("/productsCounts/:count", (req, res) => {
    const count = req.params.count;
    const filteredProducts = data.filter(items => items.stock < +count);
    const productsNamesAndCount = filteredProducts.map(items => `{Name: ${items.name}, Stock: ${items.stock}}`);
    res.send(productsNamesAndCount);
});

//papildomi:
// 6.
app.get("/minPrice/:minPrice/maxPrice/:maxPrice", (req, res) => {
    const minPrice = req.params.minPrice;
    const maxPrice = req.params.maxPrice;
    const foundPrice = data.filter(item => item.price >= +minPrice && item.price <= +maxPrice);
    res.send(foundPrice);
});

// 7.
app.post("/", (req, res) => {
    item = req.body;
    const existingId = data.some(product => product.id === item.id);
    if(existingId){
        res.send('Current ID already exists');
    }else{
        data.push(item);
        res.send(req.body); 
    }
});

app.listen(port, () => console.log(`Server is running on the http://localhost:${port}`));