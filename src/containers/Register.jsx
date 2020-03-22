import React from 'react';
import '../assets/styles/components/Register.scss';

// Iniialmente creamos componente presentacional. Luego lo cambiaremos.

const Register = () => (
  <section className="register">
    <section className="register__container">
      <h2>Regístrate por favor. Gracias</h2>
      <form className="register__container--form">
        <input className="input" type="text" placeholder="Nombre" />
        <input className="input" type="text" placeholder="Correo" />
        <input className="input" type="password" placeholder="Contraseña" />
        <button className="button">Registrarme</button>
      </form>
      <a href="">Iniciar sesión</a>
    </section>
  </section>
);

export default Register;
