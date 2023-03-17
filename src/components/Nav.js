import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logoutbutton';
import ProfileButton from './ProfileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import {
  faHome,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';

function isLoggedIn() {
  const token = Cookies.get('session_token');
  if (token) {
    return true;
  }
  return false;
}
console.log('isLoggedIn nav', isLoggedIn());
const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Budget App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            {isLoggedIn() ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <ProfileButton />
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                </Link>
              </li>
            )}
            {isLoggedIn() ? (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  <LogoutButton />
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
