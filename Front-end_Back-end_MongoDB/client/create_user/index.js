const randomNum = Math.floor(Math.random() * 100) + 10;
const randomNum2 = Math.floor(Math.random() * 100) + 10;
const randomNum3 = Math.floor(Math.random() * 100) + 10;
const randomNum4 = Math.floor(Math.random() * 100) + 10;
const randomIP = `${randomNum}.${randomNum2}.${randomNum3}.${randomNum4}`;

document
  .querySelector('#firstBtn')
  .addEventListener('click', () =>
    window.open('../membership_manager/index.html'),
  );

document
  .querySelector('#secondBtn')
  .addEventListener('click', () =>
    window.open('../user_management/index.html'),
  );

const cancelBtn = document.querySelector('#cancelBtn');
const newUserBtn = document.querySelector('#newUserBtn');

newUserBtn.addEventListener('click', () => {
  const nameField = document.querySelector('#name').value;
  const surnameField = document.querySelector('#surname').value;
  const email = document.querySelector('#email').value;

  const membership = document.querySelector('select').value;

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameField,
      surname: surnameField,
      email: email,
      ip: randomIP,
      service_id: membership,
    }),
  })
    .then(() => window.close('../create_membership/index.html'))
    .catch((err) => console.error(err));
});

const select = document.querySelector('#select');
fetch('http://localhost:3000/memberships')
  .then((res) => res.json())
  .then((data) => showInfo(data))
  .catch((err) => console.error(err));

const showInfo = (info) => {
  info.forEach((data) => {
    const option = document.createElement('option');
    option.text = data.name;
    option.value = data.name;
    select.append(option);
  });
};

cancelBtn.addEventListener('click', () => {
  window.location.reload();
  window.close('../create_membership/index.html');
});
