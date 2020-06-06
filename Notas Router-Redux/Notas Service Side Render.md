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





