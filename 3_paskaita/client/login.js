const output = document.querySelector('#result');

document.querySelector('#btn').addEventListener('click', () => {
    
    fetch("http://localhost:3000/regForm")
    .then(response => response.json())
    .then(data => checkData(data))
    .catch(err => console.log(err));

    function checkData(person){
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#psw').value;
        person.forEach(user => {
            if(email === user.email || password === user.password){
                output.textContent = 'Prisijungta';
                output.style.color = 'green';
            }else{
                output.textContent = 'Netinkamas El.paštas arba slaptažodis';
                output.style.color = 'red';
            }
        });  
    };
    
});

// Daivos kodas

// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const password = document.querySelector("#password").value;
//   const email = document.querySelector("#email").value;
//   //POST
//   fetch("http://localhost:3000/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       password,
//       email,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const output = document.querySelector("h2");

//       if (data.approved === false) {
//         output.style.color = "red";
//       } else {
//         output.style.color = "green";
//       }
//       output.textContent = data.message;
//     })
//     .catch((error) => console.log(error));
//   form.reset();
// });
