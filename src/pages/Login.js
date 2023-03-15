import React, { useState } from 'react';
import Cookies from 'universal-cookie';
function redirectToHome() {
  window.location.href = '/home';
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const cookies = new Cookies();

  const submit = (e) => {
    e.preventDefault();

    const response = fetch('https://budgeet-tracker-api.herokuapp.com/login', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      AccessControlAllowOrigin:
        'https://budget-tracker-frontend-delta.vercel.app',
      AccessControlAllowCredentials: 'true',

      body: JSON.stringify({
        username,
        password,
      }),
    });

    response
      .then((res) => {
        console.log('response status: ' + res.status);

        console.log('cookies: ' + cookies.get('session_token'));
        // get response header
        console.log('response header: ' + res.headers.get('session_token'));
        console.log('response header: ' + res.headers.get('Set-Cookie'));

        if (res.status === 200) {
          // set coookie from response header
          //redirectToHome();
        } else {
          console.log('response status: ' + res.status);
          // set error message in label tag with class error
          document.querySelector('.error').innerHTML =
            'Invalid username or password!';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form-signin">
      <form
        onSubmit={submit}
        className="border border-primary m-5 p-3 border-2 rounded-end"
      >
        <h1 className="h3 mb-3 fw-normal">Sign in</h1>
        <input
          type="text"
          className="form-control w-30"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control w-30"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="error"></label>

        <button className="w-30 mt-3 mb-2 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
