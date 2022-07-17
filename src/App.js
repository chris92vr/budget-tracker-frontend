import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Nav from './components/Nav';
import Register from './pages/Register';
import Cookies from 'js-cookie';
import Profile from './pages/Profile';

function isLoggedIn() {
  return Cookies.get('session_token') !== undefined;
  
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />


         
     <main className="form-signin w-100 m-auto mt-5">
        <Routes>
     <Route path="/login" element={<Login />}/>
     <Route path="/register" element={<Register />}/>
     </Routes>

      {isLoggedIn() ? <> <Routes> <Route path="/" element={<Home />}/>
     
     
     <Route path="/profile" element={<Profile />}/> </Routes> </> :  <p> Log in or register</p>}
      
      
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

