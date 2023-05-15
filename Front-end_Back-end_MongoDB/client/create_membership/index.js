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
const newMembershipBtn = document.querySelector('#newMembershipBtn');

newMembershipBtn.addEventListener('click', () => {
  const nameField = document.querySelector('#name').value;
  const memPrice = document.querySelector('#memPrice').value;
  const textArea = document.querySelector('#commBox').value;

  fetch('http://localhost:3000/memberships', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameField,
      price: memPrice,
      description: textArea,
    }),
  })
    .then(() => window.close('../create_membership/index.html'))
    .catch((err) => console.error(err));
});

cancelBtn.addEventListener('click', () => {
  window.location.reload();
  window.close('../create_membership/index.html');
});
