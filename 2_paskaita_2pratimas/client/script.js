fetch("http://localhost:3000/products")
.then((resp) => resp.json())
.then((response) => {
    const productsList = document.querySelector("#output");
    response.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = product;
        productsList.append(li);
    });
});
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    const product = document.querySelector('#input').value;
    
    fetch('http://localhost:3000/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({product})
    }).then(() => location.reload());
});