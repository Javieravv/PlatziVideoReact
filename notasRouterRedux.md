# Notas curso Router - Redux

Luego de crear la UI de la aplicación de Platzi Video, se agrega en este archivo las notas del curso de Router Redux.

## Creación de nueva rama en GitHub e instalación de Router Redux.

Creamos una nueva rama en Git para este nuevo curso, manteniendo lo que ya se tenía y se instala el paquete de Router Redux como una dependencia de desarrollo.

```
git checkout -b router-redux  
npm install react-router-dom --save
```

Para efectos de poder debuggear bien la aplicación, instalamos la extensión Redux DevTools para Chrome y firefox y la conectamos a la aplicación.

## ¿Cómo manejamos las rutas?

Creamos la carpeta routes en la carpeta src

En esta carpeta creamos el archivo App.js que tendrá las rutas a trabajar. En este irán las líneas necesarias para manejar las rutas, así:
```
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Route exact path='/' component={Home} />
  </BrowserRouter>
);

export default App;

```

Con Route creamos todas las rutas necesarias, apuntando a los componentes que se quieran emplear.

En el archivo .js donde estarán configuradas las rutas siempre se deberán importar los archivos en donde están los componentes que se van a ir referenciando.

Para que las rutas funcionen correctamente se debe preparar la aplicación para que funcione con las rutas.
Para ello se deberá modificar el archivo webpack.config.js agregando estas líneas:

```
module.exports = {
  {/*...*/}
  devServer: {  
    historyApiFallback: true,  
  },
  {/*...*/}
}
```







