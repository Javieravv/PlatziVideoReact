import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png'; // referenciamos la imagen
import userIcon from '../assets/static/user-icon.png';

// Creamos un compoenente presentacional.a1

const Header = props => {
    // desestructuramos el usuario de los props
    // La idea es poner la imagen que se obtiene del gravatar, con gravatar.js
    const { user } = props;
    console.log ('VALORES PARA USER...', user);
    // Validamos para saber si hay o no hay usuario
    // si hay usuarios, será verdadera.
    // Como user es objeto y no arreglo, se usa Object.key, pues los objetos no tienen la propiedad length
    const hasUser = Object.keys(user).length > 0;

    const handleLogout = () => {
        // Como trabajamos con el state, debemos crear un action que cerrará la sesión
        props.logoutRequest({});  // Se envía un objeto vacío para así reinicar el state de user
    };

    return (
        <header className="header">
            <Link to='/'>
                <img className="header__img" src={logo} alt="Platzi Video" />
            </Link>
            <div className="header__menu">
                <div className="header__menu--profile">
                    {hasUser ?
                        <img src={gravatar(user.email)} alt={user.email} />
                        :
                        <img src={userIcon} alt="" />
                    }
                    <p>Personas</p>
                </div>
                <ul>
                    {hasUser ?
                        <li><a href="/">{user.name}</a></li>
                        : null
                    }
                    {hasUser ?
                        <li>
                            <a href="#logout" onClick={handleLogout}>Cerrar Sesión</a>
                        </li>
                        :
                        <li>
                            <Link to='/login'>
                                Iniciar Sesión
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        </header>
    );
};

// traemos del state lo relacionado con el manejo de los usuarios. Es decir user 

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = {
    logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
