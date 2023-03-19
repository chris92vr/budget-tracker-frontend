import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LogoutButton from './Logoutbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState, useEffect } from 'react';
import {
  faHome,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';

import { isUserLoggedIn } from '../utils';

const Nav = () => {
  const [userLogged, setUserLogged] = useState(false);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const user = await fetch(
        'https://budgeet-tracker-api.herokuapp.com/protected',
        {
          credentials: 'include',
          mode: 'cors',
          method: 'GET',
          AccessControlAllowOrigin:
            'https://budget-tracker-frontend-delta.vercel.app',
        }
      );

      // convert the data to json
      const json = await user.json();

      // set state with the result

      setUserLogged(json.username);
    };

    // call the function
    const result = fetchData()
      // make sure to catch any error
      .catch(console.error);
    console.log(result);
  }, []);

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
            {userLogged ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <ProfileButton />
                </Link>
                <li className="nav-item">
                  <Link className="nav-link">
                    <LogoutButton />
                  </Link>
                </li>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
