import React, { useState } from "react";



function redirectToHome() {
  window.location.href = '/';
}


const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  
  

    const submit = (e) => {
      e.preventDefault();

      const response = fetch('http://localhost:8000/signin', {
        
        
       
      method: 'POST',
      
          headers: {'Content-Type': 'application/json'},
          
          credentials: 'include',
          body: JSON.stringify({
              username,
              password
          })
      });
        response.then(res => {
            if (res.status === 200) {
      
                redirectToHome();
            } else {
                alert('Invalid username or password');
            }

        }   ).catch(err => {
            alert('Invalid username or password');
        }
        );
    
}
return (
    <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <input type="text" className="form-control" placeholder="Username" required
                 onChange={e => setUsername(e.target.value)}
          />

          <input type="password" className="form-control" placeholder="Password" required
                 onChange={e => setPassword(e.target.value)}
          />

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
  );

}

export default Login;


