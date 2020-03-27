# Configuración terminal, entorno de trabajo y herramientas para React

## 1. Configuración de la terminal.

1.- Instalamos la aplicación Hyper de la web www.hiper.is

2.- Instalamos ZSH de la dirección https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH

Ejecutamos el comando ```brew install zsh zsh-completions ```

3.- Instalamos un FrameWork de ZSH que sirve para personalizar y configurar de mejor manera la terminal.

Para ello vamos a la dirección https://ohmyz.sh/ y ejcutamos la instrucción

```
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Con esto podemos mejorar la apariencia de la terminal de Hyper. También podemos cambiar los temas modificando el archivo .zshrc y ejecutando luego el comando ```source .zshrc ```

4.- Instalamos una herramienta adecuada para el navegador.

Instalamos el plugin JSON Viewer para google chrome, que permite ver mejor los objetos JSON

Estas configuraciones aplican a modo general para trabajar con la terminal.

## 2.- Configurar entorno de trabajo, herramientas, paquetes, dependencias, etc, para trabajar con React Js

Todas las herramientas usadas para tener un adecuado entorno de trabajo con node, react.js, webpack, babel, eslint, sass, etc.

Ayuda a montar el entorno de trabajo para poder tener una adecuada experienca desarrollando con herramientas avanzadas de JavaScript.

Ayuda a montar servidores locales, a descargar las dependencias de node, a instalar react app, a instalar babel para que las aplicaciones de JS se lean en cualquier navegador, a configurar los distintos paquetes a fin de que se vaya compilando la aplicación de manera inmediata cada vez que se esté desarrollando.

Podemos primero crear el repositorio vacío en GitHub, clonarlo al computador de trabajo y ahí sí trabajar.
Sin embargo, aquí iniciaremos desde cero.

1.- Creamos el archivo package.json vacío.

``` npm init -y ```

Después crearemos la configuración básica, con los directorios src, public.

Dentro de esos directorios se crearán otros, como src/components, en donde irán los diferentes componentes.

2.- Instalamos react y react-dom

``` npm install react react-dom ```

3.- Instalamos Babel.

Usamos este comando:

```
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
```

Luego creamos un archivo llamado .babelrc con lo siguiente:

```
{
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

4.- instalamos Webpack

Usamos este comando:

```
npm install webpack webpack-cli html-webpack-plugin html-loader  --save-dev
```

Luego se crea un archivo llamado webpack.config.js con el siguiente código:

```
// Creamos refernicas a plugins que se emplearan para la compilación del proyecto
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

5.- Instalamos el entorno de desarrollo local, o el servidor local.

Usamos

```
npm install --save-dev webpack-dev-server
```

Luego veremos modificaciones en package.json para crear un script llamado start, con este código:

```
"scripts": {
    "start": "webpack-dev-server --open --mode development"
  },
```

y lo corremos con ```npm run start ```

6.- Ahora instalaremos los estilos con SASS.

Para ello corremos en la terminal el siguiente comando:

```
npm install --save-dev mini-css-extract-plugin css-loader node-sass sass-loader
```

7.- Configuramos ESLint

Ayuda a detectar errores, bugs, typos, y nos ayuda a tener un estándar en el proyecto.

Usamos el comando

```
npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y
```

8.- Usamos webpack también para trabajar con las imágenes que se van a emplear en el proyecto.

Instalamos un loader para los archivos, por lo cual instalamos un paquete para ello.

Usamos el comando:

```
npm install --save-dev file-loader
```

Luego de ello agregamos al archivo webpack.config.js estas líneas en el lugar adecuado:

```
rules: [
  {
    test: /\.(png|gif|jpg)$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: 'assets/[hash].[ext]' },
      }
    ],
  },
],
```

Y deberemos emplearlo referenciándolo en el componente que se necesite.

```
import <nombreimagen> <ruta de la imagen
```

9.- Específicamente para este proyecto, empleamos una API Rest para obtener datos, los cuales se traerán en formato JSON.

Simulamos esa API Rest en el entoro local, para lo cual se instalará el servidor de JSON con este comando:

```
sudo npm install json-server -g
```

Debe instalarse con permisos de administrador. Por ello se emplea ``` sudo ``` en Mac o Linux.

El contenido del archivo JSON lo descargamos de esta dirección: https://gist.github.com/gndx/d4ca4739450afaa614efe4570ac362ee

Y creamos el archivo llamado initialState.json

Luego de instalado el paquete de json-server lo debemos ejecutar enviándole el nombre del archivo json que se creó en donde estarán los datos que servirán para el ejercicio.

```
json-server initialState.json
```

Se debe correr este último comando en otra ventana diferente de la terminal, por cuanto se estarán corriendo al tiempo dos procesos: el que tiene la aplicación y el que tiene el servidor de json.

10.- Se trabaja con React hooks para manejar el ciclo de vida de los componentes.

11.- Instalando Protypes al proyecto.

Los PropTypes son una propiedad de nuestros componentes que nos permiten especificar qué tipo de elementos son nuestras props: arrays, strings, números, etc.

Por defecto, enviar todas nuestras props es opcional, pero con los propTypes podemos especificar cuáles props son obligatorias para que nuestro componente funcione correctamente con el atributo isRequired.

Se instalan con el comando

```
npm install --save prop-types
```

Para usarlos se debe colocar en el archivo pertinente la líea

```
import PropTypes from 'prop-types';
```

