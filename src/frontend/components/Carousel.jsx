// Componente para mostrar el carrusel de imágenes
// En este componente traemos por parámetro un hijo, que se mostrará en el mismo.a1
// Para este caso será los ítems que tiene el carrusel.

import React from 'react';
import '../assets/styles/components/Carousel.scss';

const Carousel = ({ children }) => (
  <section className='carousel'>
    <div className='carousel__container'>
      {children}
    </div>
  </section>
);

export default Carousel;
