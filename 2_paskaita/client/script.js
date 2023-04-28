fetch("http://localhost:3000/")
.then((resp) => resp.json())
.then((response) => {
    const namesList = document.querySelector("#names");
    response.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        namesList.append(li);
    });
});
const btn = document.querySelector('#nameBtn');
btn.addEventListener('click', () => {
    const name = document.querySelector('#input').value;

    fetch('http://localhost:3000/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    }).then(() => location.reload());
});