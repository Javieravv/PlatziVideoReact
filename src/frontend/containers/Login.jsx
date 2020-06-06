import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest} from '../actions';
import '../assets/styles/components/Login.scss';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

// Inicialmente se crea un componente presentacional. Luego se cambia el tipo de componente 

const Login = props => {
  // En una constante se trae el formulario y la función para guardar 
  // esos valores
  // Se desestructuran estas dos constantes, pues vienen del estado
  // de la app. Por eso se usa useState y se inicializa con email
  // Intencionalmente se omite manejar la información del password, pues por ahora no se va a usar
  const [form, setValues] = useState({
    email: '',
  });
  // Esta función maneja loscambios que se hagan en los inputs 
  // con event se escucha lo que pasa en el input y se tienen en cuenta
  // su valor y sus propiedades.
  const handleImput = event => {
    setValues ({
      ...form,
      [event.target.name]: event.target.value
    })
  };

  // hacemos la función para enviar los elementos capturados, cuando se de
  // enviar al formulario 
  const handleSubmit = event => {
    event.preventDefault (); // para evitar comportamiento por default del formulario
    console.log (form);
    props.loginRequest(form); // enviamos la información del formulario al state o estado
    props.history.push('/'); // enviamos al usuario al home
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Inicia sesión</h2>
        <form className="login__container--form" onSubmit={handleSubmit}>
          <input
            name="email"
            className="input"
            type="text"
            placeholder="Correo"
            onChange={handleImput}
          />
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Contraseña"
            onChange={handleImput}
          />
          <button className="button">Iniciá sesión</button>
          <div className="login__container--remember-me">
            <label>
              <input
                type="checkbox"
                id="cbox1"
                value="first_checkbox"
              />
              Recuérdame
            </label>
            <a href="/">Olvidé mi contraseña</a>
          </div>
        </form>
        <section className="login__container--social-media">
          <div><img src={googleIcon} />Inicia sesión con Google1 </div>
          <div>
            <img src={twitterIcon} alt="Iniciar Sesión con Twitter" />Inicia sesión con Twitter
          </div>
        </section>
        <p className="login__container--register">
          No tienes ninguna cuenta {' '}
          <Link to='/register'>
            Regístrate.
          </Link>
        </p>
      </section>
    </section>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect (null, mapDispatchToProps)(Login);
