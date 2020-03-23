import React from 'react';
import '../assets/styles/components/Search.scss';

// Componente para la búsqueda
// También es un componente preentacional.

const Search = () => (
    <section className="main">
        <h2 className="main__title">¿Qué quieres buscar hoy...?</h2>
        <input type="text" className="input" placeholder="Buscar un video" />
    </section>
);

export default Search;
