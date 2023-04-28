fetch("http://localhost:3000/productsAndPrice")
.then((resp) => resp.json())
.then((response) => {
    const productsList = document.querySelector("#output");
    response.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} ${product.price}€`;
        productsList.append(li);
    });
});

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    const product = document.querySelector('#input').value;
    const price = document.querySelector('#price').value;
    fetch('http://localhost:3000/productsAndPrice', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: product, price: price})
    }).then(() => location.reload());
});