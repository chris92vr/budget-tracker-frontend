import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Nav from './components/Nav';
import Register from './pages/Register';
import Profile from './pages/Profile';

import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Nav />

        <main className="w-100 m-auto mt-5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <>
            {' '}
            <Routes>
              {' '}
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />{' '}
            </Routes>{' '}
          </>
        </main>
      </HashRouter>
    </div>
  );
}

export default App;
