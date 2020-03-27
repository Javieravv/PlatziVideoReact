# Pasos para crear entorno de trabajo para aplicación React

Se explican los pasos a tener en cuenta para armar el entorno de trabajo para desarrollar una aplicación con React.
Esto de acuerdo a los cursos vistos en PlatziVideo.

## Pre-requisitos

Se debe tener instalado previamente Node.js y npm. En caso de no estarlo puede hacerse en la web.

Node js puede descargarse en https://nodejs.org/es/
Sobre npm puede verse en https://www.npmjs.com/

## ¿Qué se debe instalar?

### 1.- Crear archivo package.json vacío.

``` npm init -y ```

### 2.- Instalar React y react-domc

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

### 3.- Instalar babel y crear el archivo de configuración.

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

Crear archivo ``` .babelrc ``` y agregarle: 

```
{
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

### 4.- Instalación de WebPack y creación del archivo ```webpack.config.js```

```
npm install webpack webpack-cli html-webpack-plugin html-loader  --save-dev
```

Se crea en la raíz del proyecto el archivo ```webpack.config.js``` y se le agrega este código:

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
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
        test : /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin ({
      filename: 'assets/[name].css'
    })
  ],
};
```

Las líneas de ese archivo pueden variar, dependiendo de lo que se vaya instalando y que el proyecto requiera.

### 5.- Instalación entorno-servidor de desarrollo local y modificación de ```package.json```

```
npm install --save-dev webpack-dev-server
```

En package.json se agrega a ```scripts``` esta línea: 

```
    "start": "webpack-dev-server --open --mode development"

```

Así se podrá correr el proyecto con ```npm run start ``` y se supone que todos los cambios que se hagan al proyecto automáticamente se verán en el navegador. 

### 6.- Instalación de estilos SASS

```
npm install --save-dev mini-css-extract-plugin css-loader node-sass sass-loader
```

En el archivo ```webpack.config.js``` agregamo un ```module``` con este texto:

```
{
    test: /\.(s*)css$/,
    use: [{
          loader: MiniCssExtractPlugin.loader
          },
         'css-loader',
         'sass-loader'
         ]
},
```

### 7.- Instalación de ESLint y creación de archivo de configuración.

```
npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y
```

Creamos el archivo de configuración ```.eslintrc``` y le agregaremos las líneas necesarias para configurar esta herramienta.

### 8.- Loader para extraer archivos .png, .jif y .jpg que se empleen en el proyecto y configuración en webpack.config.js

```
npm install --save-dev file-loader
```

Modificamos el archivo ```webpack.config.js``` para agregarle una ```rule``` con estas líneas:

```
  {
    test: /\.(png|gif|jpg)$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: 'assets/[hash].[ext]' },
      }
    ],
  },
```

### 9.- Instalación de json-server para simular API Rest de manera local

En caso de necesitarse:

```
sudo npm install json-server -g
```

### 10.- Instalación de Protypes para react

```
npm install --save prop-types
```

Para usarlos se en los archivos .JSX se coloca esta línea:

```
import PropTypes from 'prop-types';
```

### 11.- Instalamos React Router

```npm install react-router-dom --save```

### 12.- Instalamos Redux.

```
npm install redux react-redux --save
```

### 13.- Instalación de classNames

```
npm install classnames --save
```

## Anotaciones sobre Git

Para crear una nueva rama del proyecto:

```git checkout -b <nombre rama> ```

### Estructura de los directorios que debe manejar la aplicación:

La estructura de archivos que debe manejar el proyecto será esta:

```
/Directorio Raiz
    /public
        index.html 
    /src
        index.js
        /actions
            index.js
        /assets
            /static
            /styles
                /components   
        /components
        /containers
        /hooks
        /reducers
            index.js
        /routers
            App.js   
        /utils   
```

En el ```Directorio Raìz``` deberán ir estos archivos:

```
.babelrc
.eslintrc
.gitignore
package.json
webpack.config.js
```

Esta estructura puede variar dependiendo de cómo se decidan distribuir las carpetas, pues hay varias maneras de hacerlo, lo cual puede tener ventajas y desventajas.

## Estructura del archivo ```.gitignore```

En este archivo irán estas líneas, según recomendación de www.platzi.com:

```
# Node template

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE
.idea/*
*.iml
*.sublime-*

# OSX
.DS_Store
.vscode

# Docs Custom
.cache/
yarn-error.log

# Build
dist/
```









