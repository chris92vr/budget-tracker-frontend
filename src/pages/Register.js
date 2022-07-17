import React, { useState } from "react";

function redirectToHome() {
    window.location.href = '/';
}

const Register = () => {
   
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    
    const submit = (e) =>  {
        e.preventDefault();

        const response = fetch('http://localhost:8000/signup', {
   
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
             
        body: JSON.stringify({
                
                email,
                password,
                username,
                
            }),
        
        
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
   
    <h1 className="h3 mb-3 fw-normal">Please register</h1>
    <div className="form-floating">
      <input type="text" className="form-control"  placeholder="Username" required
            onChange={(e) => setUsername(e.target.value)}      />
     
    </div>
     
  
    <div className="form-floating">
      <input type="email" className="form-control"  placeholder="name@example.com" required
            onChange={(e) => setEmail(e.target.value)}      />
     
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" placeholder="Password" required
            onChange={(e) => setPassword(e.target.value)}      />
      
    </div>
    

    <div className="checkbox mb-3">
     
      
      
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    
  </form>
  );
}



export default Register;