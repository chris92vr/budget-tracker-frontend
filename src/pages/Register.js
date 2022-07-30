import React, { useState } from 'react';

function redirectToHome() {
  window.location.href = '/budget-tracker-frontend';
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();

    const response = fetch('http://localhost:8000/signup', {
      mode: 'cors',
      accessControlAllowOrigin: '*',

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        email,
        password,
        username,
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
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <input
          type="text"
          className="form-control w-30"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="checkbox mb-3"></div>
        <button className="w-100 btn btn-lg btn-primary w-30" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
