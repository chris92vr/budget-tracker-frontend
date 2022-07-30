import React, { useState } from 'react';

function redirectToHome() {
  window.location.href = '/budget-tracker-frontend/';
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();

    const response = fetch('http://localhost:8000/signin', {
      method: 'POST',

      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      accessControlAllowOrigin: '*',

      body: JSON.stringify({
        username,
        password,
      }),
    });
    response
      .then((res) => {
        if (res.status === 200) {
          redirectToHome();
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((err) => {
        alert('Invalid username or password');
      });
  };
  return (
    <div className="form-signin">
      <form
        onSubmit={submit}
        className="border border-primary m-5 p-3 border-2 rounded-end"
      >
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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

        <button className="w-30 mt-3 mb-2 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
