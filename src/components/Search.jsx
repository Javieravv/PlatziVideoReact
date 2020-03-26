import React from 'react';
import classNames from 'classnames';
import '../assets/styles/components/Search.scss';

// Componente para la búsqueda
// También es un componente preentacional.

const Search = ({ isHome }) => {
    const inputStyle = classNames('input', {
        isHome
    });

    return (
        <section className="main">
            <h2 className="main__title">¿Qué quieres buscar hoy...?</h2>
            <input
                type="text"
                className={inputStyle}
                placeholder="Buscar un video"
            />
        </section>
    );
};

export default Search;
