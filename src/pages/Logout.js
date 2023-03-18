import { isUserLoggedIn } from '../utils';

const logOut = () => {
  fetch('https://budgeet-tracker-api.herokuapp.com/logout', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    AccessControlAllowOrigin:
      'https://budget-tracker-frontend-delta.vercel.app',
    AccessControlAllowCredentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = '/';
      isUserLoggedIn(false);
    })
    .catch((err) => console.log(err));
};

if (window.confirm('Are you sure you want to log out?')) {
  logOut();
}

export default logOut;
