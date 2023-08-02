import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';
//TODO реализация емейла () рядом с ссылкой
function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Место Россия" className="header__logo" />
      <Link to={props.pathTo} className="header__action" onClick={props.onSignOut}>{props.linkText}</Link>
    </header>
  );
}

export default Header;
