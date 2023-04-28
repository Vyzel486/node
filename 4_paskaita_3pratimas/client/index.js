document.querySelector("#btn").addEventListener("click", () => {
  const id = +document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const category = document.querySelector("#category").value;
  const price = +document.querySelector("#price").value;
  const stock = +document.querySelector("#stock").value;

  fetch("http://localhost:3000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: name,
      category: category,
      price: price,
      stock: stock,
    }),
  })
    .then((data) => {
      if (data(tyeOf(id))) {
        const message = document.createElement("p");
        message.textContent = "Current ID already exists";
        message.style.color = "red";
        document.body.append(message);
      }
    })
    .catch((err) => console.error(err));
});
