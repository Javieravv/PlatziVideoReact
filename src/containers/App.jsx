import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Catetories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';
import useInitialState from '../hooks/useInitialState';
import '../assets/styles/App.scss'; // se recomienda usar sí la extensión.

// Esta clase servirà de contenedor para todos los componentes de la aplicación
// eslint-disable-next-line no-trailing-spaces
// Solo se llamará una vez. 
// Aquí pasamos componentes anidados, siendo uno hijo del otro.
// Con react Hook podemos traer la información de los videos e iterar sobre lo que se trae.

const API = 'http://localhost:3000/initialState';

const App = () => {
  // const initialState1 = JSON.parse(JSON.stringify(useInitialState(API)));
  const initialState = useInitialState(API)

  return initialState.length === 0 ? <h1>Loading....</h1> : (
    <div className="App">
      <Header />
      <Search />
      {initialState.mylyst?.length > 0 &&
        <Catetories title='Lista Principal'>
          {initialState.mylyst.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Catetories>
      }
      <Catetories title="Tendencias">
        <Carousel>
          {initialState.trends.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Catetories>
      <Catetories title="Originales de Platzi Video">
        <Carousel>
          {initialState.originals.map(item =>
            <CarouselItem key={item.id} {...item} />
          )} />
        </Carousel>
      </Catetories>

      <Footer />
    </div>
  );
};

export default App;

