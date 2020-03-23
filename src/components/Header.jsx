import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png'; // referenciamos la imagen
import userIcon from '../assets/static/user-icon.png';

// Creamos un compoenente presentacional.a1

const Header = () => (
    <header className="header">
        <Link to='/'>
            <img className="header__img" src={logo} alt="Platzi Video" />
        </Link>
        <div className="header__menu">
            <div className="header__menu--profile">
                <img src={userIcon} alt="" />
                <p>Personas</p>
            </div>
            <ul>
                <li><a href="/">Cuentas</a></li>
                <li>
                    <Link to='/login'>
                        Iniciar Sesión
                    </Link>
                </li>
            </ul>
        </div>
    </header>
);

export default Header;