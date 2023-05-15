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

document
  .querySelector('#newUser')
  .addEventListener('click', () => window.open('../create_user/index.html'));

fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((data) => showInfo(data))
  .catch((err) => console.error(err));

const showInfo = (info) => {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  info.forEach((data) => {
    const userCard = document.createElement('div');
    Object.assign(userCard.style, {
      width: '300px',
      height: '150px',
      backgroundColor: 'white',
      borderRadius: '2px',
      boxShadow: '0 0 10px rgb(142, 140, 140)',
      margin: '1rem 1rem 0 0',
      display: 'inline-block',
    });

    const nameAndSurname = document.createElement('p');
    Object.assign(nameAndSurname.style, {
      padding: '10px 0 35px 10px',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '1rem',
      color: 'grey',
    });
    nameAndSurname.textContent = `${data.name} ${data.surname}`;

    const email = document.createElement('div');
    email.style.padding = '7px 0 0 10px';
    email.innerHTML = `Email address: <span class="blue">${data.email}</span>`;

    const membership = document.createElement('div');
    membership.style.padding = '7px 0 0 10px';
    membership.innerHTML = `Membership: <span class="blue">${data.service_id}</span>`;

    const ip = document.createElement('div');
    ip.style.padding = '7px 0 0 10px';
    ip.textContent = `IP: ${data.ip}`;

    userCard.append(nameAndSurname, email, membership, ip);
    container.append(userCard);
  });
  const sorting = document.querySelector('select');
  sorting.addEventListener('change', () => {
    const container = document.querySelector('.container');
    container.textContent = '';
    fetch(`http://localhost:3000/users/${sorting.value}`)
      .then((res) => res.json())
      .then((data) => sortingUsers(data))
      .catch((err) => console.error(err));

    const sortingUsers = (info) => {
      info.forEach((data) => {
        const userCard = document.createElement('div');
        Object.assign(userCard.style, {
          width: '300px',
          height: '150px',
          backgroundColor: 'white',
          borderRadius: '2px',
          boxShadow: '0 0 10px rgb(142, 140, 140)',
          margin: '1rem 0.7rem 0 0',
          display: 'inline-block',
        });
        const nameAndSurname = document.createElement('p');
        Object.assign(nameAndSurname.style, {
          padding: '10px 0 35px 10px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '1rem',
          color: 'grey',
        });
        nameAndSurname.textContent = `${data.name} ${data.surname}`;
        const email = document.createElement('div');
        email.style.padding = '7px 0 0 10px';
        email.innerHTML = `Email address: <span class="blue">${data.email}</span>`;
        const membership = document.createElement('div');
        membership.style.padding = '7px 0 0 10px';
        membership.innerHTML = `Membership: <span class="blue">${data.service_id}</span>`;
        const ip = document.createElement('div');
        ip.style.padding = '7px 0 0 10px';
        ip.textContent = `IP: ${data.ip}`;
        userCard.append(nameAndSurname, email, membership, ip);
        container.append(userCard);
      });
    };
  });
};
