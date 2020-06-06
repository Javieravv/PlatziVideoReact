/**
 * Punto de entrada para que la aplicación funcione
 */

 require ('@babel/register')({
    presets:['@babel/preset-env','@babel/preset-react'    ]
 })

 // llamamos al archivo server.js donde estará toda la lógica del curso.

 require('./server');

