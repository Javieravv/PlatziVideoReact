import React from 'react';
import '../assets/styles/App.scss';

const HelloWorld = () => {
  // const hola = "Hola a todos";
  return (
    <div>
      <h1>Hola Mundo Hermoso</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, est suscipit! Ipsa delectus explicabo quis culpa eligendi? Possimus a praesentium ducimus harum repellat et ratione?</p>
      <ul>
        <li>Opcion 1</li>
        <li>Opción 2</li>
      </ul>
      <h2>Segundo Título</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus maxime dicta eos magnam sint. Error maiores, ipsa et ullam atque impedit recusandae repellat temporibus voluptas repudiandae perspiciatis harum quibusdam optio reprehenderit totam? Ea suscipit maxime iusto, quia obcaecati ex! Consequatur officia labore libero voluptas ipsum?
      </p>
      <h3>Tercer título</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo neque, laborum quis harum blanditiis recusandae, maiores voluptates sapiente earum ab illum. Maxime, unde assumenda libero culpa laborum iusto! Laborum provident possimus neque facilis, fugiat quas id, aspernatur illum sit aliquid sapiente quibusdam vero mollitia magnam?</p>
      <h3>Es otro título</h3>
      <h4>otro título</h4>
    </div>
  );
};

// const HelloWorld = () => {
//     // Podemos asignar lógica
//     // Siempre deben cedrrarse las etiquetas HTML, so pena de un error
//     const hello = 'Hola mundo de Xavier';
//     const isTrue = true;
//     return (
//         < div className={HolaMundo} >
//             <h1>Hola Mundo de Xavier</h1>
//             <h2>{hello}</h2>
//             <h3>Curso esencial de React con Platzi</h3>
//             {isTrue ? <h4>Esto es verdadero</h4> : <h5>Esto es falso</h5>}
//             {isTrue && <h4>Otra forma de hacer validacioneds</h4>}
//         </div >
//     );
// }

export default HelloWorld;
