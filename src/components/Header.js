import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Место Россия" className="header__logo" />
      <Link to={props.pathTo} className="header__action">{props.linkText}</Link>
    </header>
  );
}

export default Header;
