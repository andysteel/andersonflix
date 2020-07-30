import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import Button from '../Button';

function Menu({ pathPagina, nomeBotao }) {
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={Logo} alt="AndersonFlix Logo" />
      </Link>
      <Button as={Link} to={pathPagina} className="ButtonLink">
        {nomeBotao}
      </Button>
    </nav>
  );
}

export default Menu;
