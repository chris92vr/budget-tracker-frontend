import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logoutbutton';
import ProfileButton from './ProfileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faHome,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/fontawesome-free-solid';

const Nav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-light rounded"
      aria-label="Twelfth navbar example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link active " aria-current="page" to="/">
                Home <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>

            <>
              {' '}
              <li className="nav-item ">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  to="/login"
                >
                  Login <FontAwesomeIcon icon={faSignInAlt} />
                </Link>
              </li>
              <li className="nav-item 1">
                <Link
                  className="nav-link active "
                  aria-current="page"
                  to="/register"
                >
                  Register <FontAwesomeIcon icon={faUserPlus} />
                </Link>
              </li>{' '}
            </>

            <>
              <li className="nav-item 1">
                <LogoutButton />
              </li>

              <li className="nav-item 1 ">
                <ProfileButton />
              </li>
            </>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
