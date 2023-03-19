export const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
});

export const formatDate = (date) => {
  const d = new Date(date);
  console.log('date', date);
  return (
    ('0' + d.getDate()).slice(-2) +
    '/' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '/' +
    d.getFullYear() +
    ' ' +
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2) +
    ':' +
    ('0' + d.getSeconds()).slice(-2)
  );
};

export default function isUserLoggedIn() {
  const user = fetch('https://budgeet-tracker-api.herokuapp.com/protected', {
    credentials: 'include',
    mode: 'cors',
    method: 'GET',
  });

  if (user) {
    return true;
  } else {
    return false;
  }
}
