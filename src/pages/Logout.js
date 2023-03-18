const logout = () => {
  const response = fetch('https://budgeet-tracker-api.herokuapp.com/logout', {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    AccessControlAllowOrigin:
      'https://budget-tracker-frontend-delta.vercel.app',

    headers: { 'Content-Type': 'application/json' },
  });

  response
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/';
        // set session_token local storage to null
        sessionStorage.setItem('session_token', null);
      } else {
        alert('Invalid username or password');
      }
    })
    .catch((err) => {
      alert('Invalid username or password');
    });
};

export default logout;
