# Curso Platzi Server Side Render

## ¿Qué es Server Side Rendering?

Conceptos Importantes:

- Client Side Rendering (CSR): Renderizado del lado del cliente. Es lo habitual en una aplicación web hecha con cualquier herramienta. El archivo que tiene la aplicación se descarga en el lado del cliente y ahí se ejecuta.

Contras: Se ejecuta lentamente la aplicación y ello puede hacer que el usuario se vauya.

<Imagen>

- Server Side Rendering (SSR): Es la solución a los problemas de CSR. El servidor envía la respuesta, pero antes de descargarse los archivos el servidor envía un prerenderizado de la aplicación, en un stream que vuelve HTML, el cual se inserta en la primera respuesta y hace que el usuario previsualice el sitio.

Luego de descargado el archivo se ejecuta React, los eventos necesarios y el sitio es ya interactuable.

Hay una respuesta automática para el usuario.

En paralelo el navegador va descargando los archivos.

<Imagen>

Esto para qué se hace?:

* La carga del sitio es mucho más rápida
* Mejora el SEO del sitio. Hace que el sitio sea indexado más rápido en los buscadores.
* Look & Feel: muestra de manera más rápida el sitio.

## Actualizando Dependenicas con NPM

Resumen de la clase:

1 .Buscamos un proyecto que contenga react, react-router y redux.

2. Creamos una nueva rama del proyecto con: ```git checkout -b nombre_rama```

3. Verificar las ramas que hay que actualizar: ```npm outdated```

4. Para actualizar la aplicación ingresamos: ```npm update```

5. Para verificar si hubo actualización de paquetes, lo hacemos con: ```git status```

6. Para verificar las dependencias actualizadas, ingresamos: ```git diff```

7. Volvemos a verificar las dependencias que tenemos que actualizar con: ```git outdated```

8. Hay dependencias que no se pueden actualizar directamente con el comando _git update_, porque estas dependencias tienen otras dependencias que pueden estar siendo utilizadas por otras dependencias.

9. Corremos la aplicación (```npm run start```) para verificar que todavia funciona y que el proceso de actualización de dependencias se realizó exitosamente.

En muchos casos salen actualizaciones de seguridad que piden actualizar nuestros servicios para evitar huecos de seguridad.

## Creación del Servidor en Express.


Instalamos las siguientes dependencias:

- @babel/register: para que podamos usar babel en el servidor, que permite hacer un bind al entorno para poder usar los presets de babel en el proyecto. Una vez instalada lo configuramos en el archivo _.babelrc_, así:

- Express
- Dotenv

**Resumen de la Clase**

1. Creamos 2 carpetas dentro de la carpeta _src_: **_src/server_**: fuentes con toda la lógica relacionada con el servidor y _**src/frontend**_: fuentes con toda la lógica relacionada con la app.

2. Movemos todos los archivos de nuestra app en react ubicada actualmente en la carpeta src, hacia _src/frontend_.

3. Creamos en la carpeta _**src/server**_ 2 archivos: _index.js_ y _server.js_.

4. Instalamos las siguientes dependencias: ```npm install @babel/register```

5. En el archivo _src/server/index.js_ agregamos la siguiente configuración:
```
require(’@babel/register’)({
presets: [’@babel/preset-env’, ‘@babel/preset-react’],
})
require(’./server’)
```

6. Instalamos más dependencias: ```npm install express dotenv```.

7._ Express_ sirve para poder instalar nuestro servidor local y _dotenv_ se utiliza para manejar nuestras variables de entorno.

8. Agregamos todo el código necesario para correr el servidor de express en el archivo _**src/server/server.js**_.

9. Creamos un nuevo script en el archivo package.json, para poder ejecutar nuestro servidor:

```“scripts”: { “start:dev” : “node src/server/index” }```

10. Ejecutamos nuestro servidor desde la consola con: ```npm run start:dev```.

11. Desde el navegador ingremos a la dirección ```127.0.0.1:3000``` o ```localhost:3000``` para verificar que esta funcionando nuestro servidor de express.

## Usando Nodemon y Dotenv

Debemos solucionar dos problemas: reinicio automático del servidor cuando se hagan cambios y el uso de variables de entorno si queremos escalar nuestra aplicación.

Para ello instalamos nodemon en ambiente de desarrollo, con ```npm install nodemon --dev```.

Creamos un escript para modificar el start:dev, para dejarlo así: ```"start:dev": "nodemon src/server/index"```

Para las variables de entorno nos apoyamos en la dependencia _dotenv_ la cual ayuda a manejar variables de entorno en todo el proyecto.

Para configuarlo creamos un archjivo .env en el proyecto y ahí creamos dos variables de entorno: 

```
ENV=development
PORT=3000
```

Tener en cuenta que la variable PORT podrá llevar otra configuración para evitar que si el puerto 3000 está ocupado no se pueda acudir a otro puerto.

Luego de definidas las variables de entorno las usamos en el archivo _server.js_, así (para nuestro ejemplo):

```
import express from 'express';
 import dotenv from 'dotenv'; // variables de entorno

 dotenv.config(); // busca el archivo .env y tomas sus variables

 const { ENV, PORT } = process.env;
 const app = express();

 if (ENV === 'development') {
     console.log ('Development config');
 }

 // Llamamos a una ruta
 app.get('*', (req, res) => {
    res.send({
        hello: 'Primer Servidor en Express 1-1'
    });
 });

 app.listen(PORT, (err) => {
     if (err) console.log (err);
     else console.log (`Server running on  port ${PORT}...`);
 });
 
```

### Notas compañeros:

1. Para que más adelante no haya inconvenientes para correr este proyecto en otra máquina o que se esté corriendo este proyecto en un commit posterior, es buena práctica dejar un .env.example para recordarle al desarrollador qué configuraciones de variables de entorno debe tener el proyecto

## Integración de Webpack con Express

Es muy importante esto porque la aplicación de Express se servirá con webpack. Es importante tener varias herramientas.

Debemos instalar dos dependencias: webpack-dev-middleware y webpack-hot-middleware en entorno de desarrollo. Se instalan con ```npm install webpack-dev-middleware webpack-hot-middleware --dev```

Luego importamos webpack en el archivo de server.js y definimos varias constantes que se usarán en entorno de desarrollo (development).

Debe tenerse en cuenta que _webpack_ debe ser una dependencia de producción, no de desarrollo. Si no es así, se debe desisntalar e instalar de nuevo, como dependencia de desarrollo: ```npm install webpack```.

Modificamos el archivo _webpack.config.js_ que está en el proyecto, así:

```
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.(s*)css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: 'assets/[hash].[ext]' },
                }],
            },
        ],
    },
    devServer: {
       historyApiFallback: true,
       inline: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css'
        }),
    ],
};
```

Instalamos la dependencia react-hot-loader en entorno de desarrollo: ```npm install react-hot-loader --dev```

El _webpack-hot-middledware_ ayuda a que la aplicación se refresque en tiempo real mientras estemos trabajando.

Debe tenerse un cuidado exhaustivo en el proceso de configuración del entorno, para que haya buen refrescado de la aplicación en tiempo real.

Respecto al react-hot-loader es necesario refrescar el archivo de configuración de babel, para que no haya ningún timpo de problema al refrescar lo hecho con react, así:

```
{
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": ["react-hot-loader/babel"]
}
```

**Recapitulación de lo hecho:**

Configramos webpack dev middleware y hot middleware para crear compilador y poder refrescar en tiempo real.

Configramos Babel para que refresque los cambios de reac, con react-hot-loader.

**_Cualquier paso en falso hará que la aplicación caiga como un lego._**

## Servir React con Express

Luego de configurar de manera adeucada el entorno de desarrollo, configuraremos webpack y el srvidor para que puedan servir la aplicación.

En la respuesta del servidor (_server.js_,  send) retornamos un string que tendrá código HTML.

En el archivo _webpack.config.js_ modificamos algunas cosas, como por ejemplo remover cosas y agregar otras.

```
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/app.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.(s*)css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: 'assets/[hash].[ext]' },
                }],
            },
        ],
    },
    devServer: {
       historyApiFallback: true,
       inline: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/app.css'
        }),
    ],
};
```

## Abstrayendo React Router, creando history y haciendo initialState más accesible

Arreglamos las rutas para que puedan ser más accesibles. Se manejarán del lado del cliente y del servidor.

Instalamos las dependencias:

- history: añade un historial al enrutador
- react-router-config: pñermite añadir ciertas cpas de configuración al renturador.
- react-router

Luego cambiamos las rutas.

```npm install history react-router-config ```

Luego de ello modificamos las rutas de la aplicación, en el archivo _routes/app.js_

Debemos definir las rutas al lado del cliente y al lado del servidor. Proceso de gran importancia porque en ambos lados estarán.

Creamos en _src/routes_ el archivo _serverRoutes.js_

Luego mejoramos el initialState para que sea más accesible.

## Definición de la función principal para realizar el renderizado desde el servidor

Creamos dos funciones: para convertir los componentes en un string y enviarlos al servidor al cliente y reusar la lógica del string que se usa como html


Luego de mucho que se hizo, se ve que no carga los estilos. Para solucionarlo se instala ```npm install ignore-styles```

### Notas compañeros

Si estan teniendo el mensaje de error “Invariant failed: You should not use <Switch> outside a <Router>”. Lo que tienen que hacer es actualizar la dependencia react-router-dom para que esté a la par de la dependencia react-router. El error proviene de tener estas 2 dependencias con versiones incompatibles.

Pueden actualizar con: ```npm install react-router-dom```.

## Assets require hook

Ajustes para que los assets se carguen bien en el servidor y se envíen al cliente. Haremos uso de una dependencia llamada _asset-require-hook_ que permite hacer bind en tiempo real de las rutas a las que referencirarme en express.

**Notas importantes: **

1. Al parecer hay un problema con el archivo _file-loader_ de npm, pues al desactivar el JavaScript deja de cargar las imágenes. Según leí en un comentario, eso se debe a la versión. Revisando veo que la versión que tiene Platzi es mucho menor a la que se instaló.

2. Cuando se desactiva el JavaScript y se recarga la página, no se dibujan ni el header ni el footer.

## Hydrate y estado de Redux desde Express

Debemos hidratar todos los eventos necesarios para que sea perfecto el proceso de renderización del lado del servidor al cliente.

Para ello modificamos el archivo _index.js_ de la aplicación, para cambiar _ReactDOM.render_ por _ReactDOM.Hydrate_.

También se deberá mejorar la carga del initialState, pues se carga tanto en el servidor como en el cliente. Para ello se usa un _preloadedState_, 

## Configurando nuestro servidor para producción

Debemos hacer configuraciones en webpack y en el servidor para que todo funciones muy fluido y OK.

Esta información deberá quedar en el directorio _/src/server/public_

Debemos instalar el paquete [helmet](https://helmetjs.github.io/) que ayuda a asegurar a express con varios middlware para proteger la aplicación. Ayudará, aunque no esuna bala de plata.

```npm install helmet```

En la carpeta gitignore debemos añadir el directorio server/public

Los cambios hechos en el archivo _server.js_ se ven así:

```
import express from 'express';
import dotenv from 'dotenv'; // variables de entorno
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import  initialState from '../frontend/initialState';

dotenv.config(); // busca el archivo .env y tomas sus variables

const { ENV, PORT } = process.env;
const app = express();

if (ENV === 'development') {
    console.log('Development config');
    const webpackconfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackconfig);
    const ServerConfig = {
        port: PORT,
        hot: true
    };
    app.use(webpackDevMiddleware(compiler, ServerConfig));
    app.use(webpackHotMiddleware(compiler)); // ayuda a hacer el hbot mode replacement
} else {
    // para producción
    // configuramos carpeta pública a donde enviaremos todo el bundle que webpack genera
    app.use(express.static(`${__dirname}/public`));
    app.use(helmet());
    // Bloqueamos los Cross Domain Policies que consumen ancho de banda excesivo. Como adobe o flash
    app.use(helmet.permittedCrossDomainPolicies());
    // deshabilitamos una cabecera para evitar que el navegador sepa que nos estamos conectando desde express
    // y evitar ataques indeseados.
    app.disable('x-powered-by');
}

const setResponse = (html, preloadedState) => {
    return (`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Primera app con React y SSR1</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="assets/app.css" type="text/css">
        </head>

        <body>
            <div id="root">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
            </script>
            <script src="assets/app.js" type="text/javascript"></script>
        </body> 

        </html>
    `);
};

// Esta función ayuda a renderizar la aplicación
const renderApp = (req, res) => {
    const store = createStore (reducer, initialState);
    const preloadedState = store.getState();
    const html = renderToString (
        <Provider store = {store}>
            <StaticRouter location={req.url} context={{}}>
                
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>
    );
    res.send( setResponse(html, preloadedState) );
};

// Llamamos a una ruta
app.get('*', renderApp);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on  port ${PORT}...`);
});

```

## Configurando webpack para producción

Aquí configuraremos los assets generados desde webpack. Usaremos el dotenve. Para ello deberemos modificar el script de build en package.json.

También se eliminará el comando "start", pues ya no es necesario. (Aunque para efectos de estudio se conserva).

En el archivo _webpack.config.js_ se deberá tener en cuenta si estamos en entorno de desarrollo o de producción, para llamar o no ciertos plugins.

Para validar que todo corra bien, en el archivo _.env_ cambiamos el valor de la variable ENV de _development_ a _production_.

El puerto lo cambiamos a 3001 o a cualquier otro.

```
ENV=production
PORT=3001
```

## Optimización del Build

mimifamos màs los archivos.

Eliminamos del _package.json_ cualquier referencia a Html-loader. Quitamos las líneas correspondientes y luego ejecutamos de nuevo ```npm install```

Instalamos el paquete _compression-webpack-plugin_ en modo de desarrollo.

```npm install compression-webpack-plugin --save-dev``` 

Ayuda a que todos los assets sean comprimidos y puedan tener un peso adecuado para cuando se carguen a producción.

Agregamos el plugin _terser_ que ayuda también a la mimificación de los archivos, así: ```npm install terser-webpack-plugin --save-dev```

## Aplicar hashes al nombre de nuestros builds

Es agregar un identiicador único a cada archivo para que el navegador los lea. Si hay una nueva versión de la aplicación el navegador lea el último y no uno que ya tiene en caché.

Instalamos el paquete webpack-manifest-plugin que vamos a usar solo en entornos de producción. Cuando se compila la aplicación crea un archivo json en donde muestra toda la información de los archivos generados en producción.

Para acceder a esa información se crea una función en la carpeta server, en el archivo _getManifest.js_

```
import fs from 'fs';

const getManifest = () => {
    try {
        return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
    } catch (error) {
        console.log('se ha producido un error....', error);
    }
};

export default getManifest;
```

Para usarla en el archivo _server.js_ buscamos y usamos un middlware

## Vendorfiles en Webpack: definiendo cacheGroups

Estrategias para vendorfiles, para extraer archivos y separar la lògi a de programación en un archivo vendor que se carga de manera distinta.

Se modificará el _webpack.config.js_, en optimization, cuidadno del uso de camel case. En el archivo de configuración irá así esta parte:

```
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: async,
            name: true,
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    reuseExistingchunk: true,
                    priority: 1,
                    filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[hash].js',
                    enforce: true
                }
            }
        },
    },
```

[Por qué razón se hace Spliting con webpack](https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)

## Vendorfiles en Webpack: generando el vendorfile


## Configuración de ESLint

Esta configuración permite encontrar errores en el código, corregirlos y así tener el proyecto bien. Esto garantiza que el código sea entendible, sobre todo cuando hay equipos de desarrolladores, lo cual implica que todos deban trabajar de manera similar.

Los configuramos desde el lado de webpack, para que cuando se compile la aplicación los encuentre y permita corregirlos.

Debemos instalar los paquetes ```eslint-loader ``` y ```eslint``` en modo de desarrollo.

Luego se ejecuta el escript de start:dev y nos mostrará los distintos errores que encuentra.

Para solucionar todos los errores definimos una regla en el _package.json_.

```"lint": "eslint src/fronted --ext .js --ext .jsx --fix"```

























