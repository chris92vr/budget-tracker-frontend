import Cookies from 'js-cookie';

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

export function isUserLoggedIn() {
  const response = fetch(
    'https://budgeet-tracker-api.herokuapp.com/protected ',
    {
      credentials: 'include',
      mode: 'cors',
      AccessControlAllowOrigin:
        'https://budget-tracker-frontend-delta.vercel.app',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  response.then(
    (res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    }
    // .catch((err) => {
    //   alert('Invalid username or password');
    // });
  );
}

// get cookie using js-cookie
export const getCookie = (key) => {
  // process.browser give issue in server side rendering so we need to check if window is defined or not
  // if window is not defined then we are returning false
  if (typeof window === 'undefined') {
    return false;
  } else {
    return Cookies.get(key);
  }
};
