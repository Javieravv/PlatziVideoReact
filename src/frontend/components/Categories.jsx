import React from 'react';
import '../assets/styles/components/Categories.scss';

// En este componente traemos por parámetro un hijo, que se mostrará en el mismo.a1
// Pasamos el título por medio de props

const Categories = ({ children, title }) => (
  <div className='categories'>
    <h3 className='categories__title'>{title}</h3>
    {children}
  </div>
);

export default Categories;
