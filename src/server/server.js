/**
 * Crearemos el servidor de Express para que sirva la aplicación.
 * 
 */

import express from 'express';
import dotenv from 'dotenv'; // variables de entorno
import webpack from 'webpack';
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
}

const setResponse = (html) => {
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
            <script src="assets/app.js" type="text/javascript"></script>
        </body> 

        </html>
    `);
};

// Esta función ayuda a renderizar la aplicación
const renderApp = (req, res) => {
    const store = createStore (reducer, initialState);
    const html = renderToString (
        <Provider store = {store}>
            <StaticRouter location={req.url} context={{}}>
                
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>
    );
    res.send( setResponse(html) );
};

// Llamamos a una ruta
app.get('*', renderApp);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on  port ${PORT}...`);
});


