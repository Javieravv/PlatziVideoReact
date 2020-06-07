import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerRequest } from '../actions';
import '../assets/styles/components/Register.scss';

// Iniialmente creamos componente presentacional. Luego lo cambiaremos.
// los props se pasan al componente para usarlos con redux

const Register = (props) => {
  // Traemos el formulario y lo que se va a encargar de guardar los valores que se le están
  // asignando. Se le pasa un estado inicial al state que se está creando.
  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  // Se crea lo que va a manejar la información
  const handleInput = (event) => {
    // A setValues se le pasa la información que se va a transmitir al state
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    props.registerRequest(form);
    props.history.push('/');
  };

  // A cada input se le crea evento onChange y se le pasa handleInput
  return (
    <section className='register'>
      <section className='register__container'>
        <h2>Regístrate por favor.!</h2>
        <form className='register__container--form' onSubmit={handleSubmit}>
          <input
            name='name'
            className='input'
            type='text'
            placeholder='Nombre'
            onChange={handleInput}
          />
          <input
            name='email'
            className='input'
            type='text'
            placeholder='Correo'
            onChange={handleInput}
          />
          <input
            name='password'
            className='input'
            type='password'
            placeholder='Contraseña'
            onChange={handleInput}
          />
          <button className='button' type='button'>Registrarme</button>
        </form>
        <Link to='/login'>
          Iniciar Sesión
        </Link>
      </section>
    </section>
  );
};

const mapDispatchToProps = {
  registerRequest,
};

export default connect(null, mapDispatchToProps)(Register);

