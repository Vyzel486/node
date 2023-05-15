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
  .querySelector('#newMembership')
  .addEventListener('click', () =>
    window.open('../create_membership/index.html'),
  );

fetch('http://localhost:3000/memberships')
  .then((res) => res.json())
  .then((data) => showInfo(data))
  .catch((err) => console.error(err));

function showInfo(info) {
  info.forEach((data) => {
    const card = document.createElement('div');
    Object.assign(card.style, {
      width: '300px',
      height: '150px',
      backgroundColor: 'white',
      borderRadius: '2px',
      boxShadow: '0 0 10px rgb(142, 140, 140)',
      marginTop: '1rem',
      display: 'inline-block',
    });
    const output = document.createElement('div');
    Object.assign(output.style, {
      textAlign: 'center',
      padding: '1rem 0',
    });
    output.innerHTML = `<b>${data.price} ${data.name}</b><br>${data.description}`;

    const hr = document.createElement('hr');
    Object.assign(hr.style, {
      marginTop: '20px',
      width: '100%',
      borderColor: 'rgba(206, 211, 215, 0.166)',
    });

    const del = document.createElement('button');
    Object.assign(del.style, {
      padding: '10px',
      backgroundColor: 'rgba(240, 141, 141, 0.651)',
      float: 'right',
      display: 'block',
      margin: '12px',
      cursor: 'pointer',
      color: 'darkred',
      border: 'none',
      borderRadius: '3px',
    });
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-trash');
    const span = document.createElement('span');
    span.append(icon);
    del.append(span);

    del.addEventListener('mouseenter', () => {
      Object.assign(del.style, {
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'red',
      });
    });
    del.addEventListener('mouseleave', () => {
      Object.assign(del.style, {
        backgroundColor: 'rgba(240, 141, 141, 0.651)',
        color: 'darkred',
      });
    });
    del.addEventListener('click', () => {
      fetch(`http://localhost:3000/memberships/${data._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
        .then(() => location.reload())
        .catch((err) => console.error(err));
    });

    card.append(output, hr, del);
    const conteiner = document.querySelector('#conteiner');
    Object.assign(conteiner.style, {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '4rem',
    });
    conteiner.append(card);
    const main = document.querySelector('main');
    main.append(conteiner);
  });
}
