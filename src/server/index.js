/**
 * Punto de entrada para que la aplicación funcione
 * ignore-styles lo que hace es hacer que se ignoren la generación de archivos
 * css en el lado de servidor, pues no hay forma de pintar css allí.
 */
require('ignore-styles');

require('@babel/register')({
   presets: ['@babel/preset-env', '@babel/preset-react']
});

require('asset-require-hook')({
   extensions: ['jpg', 'png', 'gif'],
   name: '/assets/[hash].[ext]'
});

// llamamos al archivo server.js donde estará toda la lógica del curso.
require('./server');

