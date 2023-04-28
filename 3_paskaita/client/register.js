document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const password = document.querySelector('#psw').value;
    const repeatPassword = document.querySelector('#repeatPsw').value;
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const address = document.querySelector('#address').value;
    const postCode = document.querySelector('#postCode').value;
    const city = document.querySelector('#city').value;
    const phone = document.querySelector('#phone').value;
    
    fetch('http://localhost:3000/regForm', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password: password, 
            repeatPassword: repeatPassword,
            email: email,
            name: name,
            surname: surname,
            address: address,
            postCode: postCode,
            city: city,
            phone: phone
        })
    }).then(() => location.reload());
});