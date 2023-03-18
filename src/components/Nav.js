import { Link } from 'react-router-dom';
import LogoutButton from './Logoutbutton';
import ProfileButton from './ProfileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faHome,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';

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

            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <ProfileButton />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </Link>
            </li>

            <li className="nav-item">
              <LogoutButton className="nav-link" />
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
