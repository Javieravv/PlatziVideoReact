# Notas curso Router - Redux

Luego de crear la UI de la aplicación de Platzi Video, se agrega en este archivo las notas del curso de Router Redux.

Tener en cuenta que dentro del lenguaje JSX se puede manejar una lógica ternaria, para evaluar una condición, así:

```
{
  condicion
  ?
     se ejecuta si es verdadero
  :
     se ejecuta si es falso
}
```

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

## React Fragment

Permite no añadier más elementos al DOM, como div, header, h1, etc., 

Se usan con 
´´´
<React.fragment></React.fragment>
```
o con
```
<>
</>
```

Se recomienda emplear esta última opción.

## Persistencia de componentes.

Para que componentes de la aplicación que sean persistentes siempre estén ahí, empleamos los Layauts, para así no tener que renderizar varias veces componentes que estarán fijos en la aplicación, como por ejeplo los Header o Footer.

Se crea un componente conel nombre de Layout para que maneje la persistencia entre Header y Footer.

Para esta aplicación sería así:

```
import React from 'react';
// Importamos los componentes que vayan a quedar fijos y al componente le enviaremos
// un parametro, el cual será el que vaya a cambiar.
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ( {children} ) => (
   <div className="App">
       <Header />
        {children}
       <Footer />
   </div>
);

export default Layout;
```
Luego lo tenemos en ecuenta en el archivo de rutas y lo encapsulamos dentro del Switch, así:

```

## Cómo se manejan los enlaces o Links en React

En cada uno de los componentes en los que se vaya a colocar enlaces se deberá importar el elemento link

```
import { Link } from 'react-router-dom';
```
Para usarlo, se emplean estas líneas:

```
<Link to='<ruta>'>
  ...Lo que se va a mostrar
</Link>
´´´ 
Se recomienda el uso de este componente Link y no usar la etiqueta ```<a> Link </a> ``` porque con esta última la aplicación se renderiza, lo cual no es aconseajado.

# Redux

## Qué es Redux?

Redux es una librería escrita en JavaScript, basada en la arquitectura Flux y creada por Dan Abramov.

Se basa en 3 principios fundamentales:

1. Solamente hay una fuente de la verdad.
2. El estado es de solo lectura.
3. Solamente podemos utilizar funciones puras.

Nuestra UI va a activar una action, esta action va a ejecutar un reducer para modificar la información del store, y al actualizarse el store la UI se va a modificar.

### Instalación de Redux.

Desde la terminal, ejecutamos el comando
```
npm install redux react-redux --save
```

## Integración de React Redux en el proyecto.

Se deben crear dos carpetas para que contengan los actions y los reducers. Estas se crearán en /src

```
/src/actions
/src/reducers
```

En cada una de esas carpetas se creará un archivo llamado ```index.js```.

Luego lo añadimos al proyecto principal, en el archivo ```index.js``` principal de la aplicación.
Ello permite conectar la aplicación con React Redux, que dará un provider que permite encapsular los componentes por medio de un conect, que tendrá toda la información del store que se transmite a los componentes.
Así se puede tener la informacion del estado en todos los componentes.

```
import { Provider } from 'react-redux';
import { createStore } from 'redux';

```
Después se inicialiar la aplicación con el Provider, así:

```
ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

## Cómo crear el Store de Redux

Para crear un Store necesitamos llamar a la función ```createStore``` del paquete de redux pasándole los parámetros del ```reducer``` y de ```initialState```.

Para conectar un componente a Redux vamos a necesitar importar ```connect``` de ```react-redux```. Connect va a aceptar dos parámetros:

1.- ```mapStateToProps```: es una función que le va a indicar al provider qué información necesitamos del store.

2.- ```mapDispatchToProps```: es un objeto con las distintas funciones para ejecutar una action en Redux.

Debemos crear el store inicial, 

```
const initialStore = {
  ...Contenido
}

const store = createStore (reducer, initialStore)
```
Así, se deberá importar el archivo donde están los reducers y pasarle al provider el store.

El archivo ```index.js ``` deberá quedar así, para este proyecto:

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
// import HelloWorld from './components/HelloWorld';
// import Header from './components/Header';
import App from './routes/App';

const initialState = {
    "user" : [],
    "playing": [],
    "myList": [],
    "trends": [{
    ...
    }
}

const store = createStore (reducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

Después habrá que eliminar la fetchApi que se había creado para traer el store, pues ya no se usa y también modificar el archivo 

Para nuestro caso el container ```Home ``` será el que deba conectar la aplica
Agregamos ```import { connect } from 'react-redux';``` que ayuda a conectar la app con react y redux

Al final de Home se deben exportar las funciones que contienen lo relacionado para que la app funcione.

```
export default connect (props, actions)(Home);
```

mapStateToprops es una función que traerá los props del estado dela aplicación.

## Manejo del flujo de la Información.

Para esto deberemos trabajar con los actions y los reducers de la aplicación.

## Instalación de MD5

Esta librería se utiliza con Gravatar.js para crear un hash que tiene relación con la imagen del usuario que se va a mostrar. Se crea dicho hash, que es criptografìa, a partir del mail que se le de.


Para instalarlo:

```
npm install md5 --save
```


