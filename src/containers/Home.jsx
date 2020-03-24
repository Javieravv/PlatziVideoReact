import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Catetories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import '../assets/styles/App.scss'; // se recomienda usar sí la extensión.

// Esta clase servirà de contenedor para todos los componentes de la aplicación
// eslint-disable-next-line no-trailing-spaces
// Solo se llamará una vez. 
// Aquí pasamos componentes anidados, siendo uno hijo del otro.
// Con react Hook podemos traer la información de los videos e iterar sobre lo que se trae.

const Home = ({ myList, trends, originals, user }) => {
  // const initialState1 = JSON.parse(JSON.stringify(useInitialState(API)));
  return (
    <>
      <Search />
      {myList.length > 0 &&
        <Catetories title="Tendencias">
          <Carousel>
            {myList.map(item =>
              <CarouselItem
                key={item.id}
                {...item}
                isList
              />
            )}
          </Carousel>
        </Catetories>
      }
      <Catetories title="Tendencias">
        <Carousel>
          {trends.map(item =>
            <CarouselItem
              key={item.id}
              {...item}

            />
          )}
        </Carousel>
      </Catetories>
      <Catetories title="Originales de Platzi Video">
        <Carousel>
          {originals.map(item =>
            <CarouselItem
              key={item.id}
              {...item}

            />
          )} />
        </Carousel>
      </Catetories>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
  }
};

export default connect(mapStateToProps, null)(Home);

