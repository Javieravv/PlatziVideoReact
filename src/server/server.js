/* eslint-disable global-require */
/**
 * Crearemos el servidor de Express para que sirva la aplicación.
 *
 */

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
import initialState from '../frontend/initialState';
import getManifest from './getManifest';

dotenv.config(); // busca el archivo .env y tomas sus variables

const { ENV, PORT } = process.env;
const app = express();

if (ENV === 'development') {
  console.log('Development config');
  const webpackconfig = require('../../webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackconfig);
  const ServerConfig = {
    port: PORT,
    hot: true,
  };
  app.use(webpackDevMiddleware(compiler, ServerConfig));
  app.use(webpackHotMiddleware(compiler)); // ayuda a hacer el hbot mode replacement
} else {
  // implementamos el middleware para el getManifest
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
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

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="${mainStyles}" type="text/css">
            <title>Platzi Video Javo</title>
        </head>

        <body>
            <div id="root">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
            </script>
            <script src="${mainBuild}" type="text/javascript"></script>
            <script src="${vendorBuild}" type="text/javascript"></script>
        </body> 

        </html>
    `);
};

// Esta función ayuda a renderizar la aplicación
const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

// Llamamos a una ruta
app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(`Server running on port ${PORT}...`);
  }
});
