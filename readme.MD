# Notas

Este ejemplo muestra sentencias básicas para creación y cenexión a una base de datos SQlite3, la base de datos puede ser creada con cualquier aplicación como "admin sqlite" o "sqlite studio", pero también se muestra un código para la creación de la base de datos escrito en js (archivo:crearDB.mjs).

Puede instalar una extensión de VSCode para visualizar una base de dataos SQLite3, la exteción es:
"SQLite Viewer de Florian Klampfer", este complemeto solo permite visualizar los datos, no permite crear la base de datos ni modificarla.

## instalar

Despues de bajar este repositorio desde gitHub, puede instalar esta aplicación ejecutando la sentencia siguiente en su shell o en una ventana de power shell.

```sh
npm install
```
Esto instala los paquetes necesarios para el proyecto y que son 2, cuyo nombre (una vez instaados) puedra ver en el archivo package.json

```json
"dependencies": {
    "sqlite": "^4.1.2",
    "sqlite3": "^5.1.6"
  },
```

## crear base de datos

El archivo de base de datos "posts.sqlite3" ya viene en la descarga de este proyecto, sin embargo si quiere volver a crear la base de datos puede hacerlo asi:

Para crear la base de datos con los campos {userId,id,title,body} y 8 datos fake, ejecute:

```sh
node crearDB.mjs
```

## Ejemplos de acceso a la base de datos

En el archivo "index-async.mjs" puede encontrar ejemplos de acceso a la base de datos usando async/await, en las funciones:

1. muestra()
2. leerUnDato()
3. insertaDato({ id, userId, title, body })
4. actualizaDato({ id, userId, title, body })

Y el mismo código  pero con promesas en el archivo "index-promes.mjs"

1. muestraCnPromesa(callback)
2. insertaDatoCnPromesa({ id, userId, title, body }, callback)
3. actualizaDatoCnPromesa({ id, userId, title, body })

## patron DAO

Data Acces Object, es un patron de diseño muy recomendaable que divide el acceso a la bse de datos en 2 partes:

1. la parte del controlador de la base de datos.
2. la parte del modelo de la base de datos. 

El controlador contiene el código de conexion a la base de datos.
El modelo contiene la lógica de consultas/movimientos a una entidad de la base de datos.

En este ejemplo tenemos 3 archivos: ("SqliteClase.mjs", "partes.Model.mjs", "usarParteModel.mjs"), en el archivo:
1. "SqliteClase.mjs" tiene el código del controlador de la base de datos SQLite
2. "partes.Model.mjs" tiene el código del modelo de la tabla partes
3. "usarParteModel.mjs" tiene un ejemplo de como se usa el modelo.

Note que el controlador será único para toda la base de datos,el modelo cambia, en este ejemplo estamos usando el modelo "partes", pero se podria usar otros modelos como por ejemplo: "proveedores", "ventas" etcetera, pero cada modelo usara el mismo controlador.