import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Место Россия" className="header__logo" />
      <div className="header__container">
        <p className="header__email">{props.email}</p>
        <Link
          to={props.pathTo}
          className={`header__action ${props.email && `header__action_signed-in`}`}
          onClick={props.onSignOut}
        >
          {props.linkText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
