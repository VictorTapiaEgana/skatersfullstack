
# Aplicación fullstack.

 Aplicación web que permite registrar participantes para una competencia deportiva, una vez registrado, permite entrar a su perfil de usuario permitiendo editarlo o eliminarlo previa autorizacion mediante JWT, los registros son almacenados y consultados desde una base de datos en postgres, se uso handlebars para renderizar el frontend.


![](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white) ![](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white) ![](https://img.shields.io/badge/Bootstrap-7952B3.svg?style=for-the-badge&logo=Bootstrap&logoColor=white) ![](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![](https://img.shields.io/badge/Handlebars.js-000000.svg?style=for-the-badge&logo=handlebarsdotjs&logoColor=white)

### Estructura de Carpetas
```
└── 📁Skate Park
    └── .env    
    └── 📁avatares   
    └── db_config.js
    └── 📁functions
        └── actualizarDatos.js
        └── eliminarSkater.js
        └── guardarSkater.js
        └── listadoSkaters.js
        └── login.js    
    └── 📁public
        └── 📁css
            └── index.css
        └── 📁images
            └── banner-logo2.png            
            └── documento.png
            └── facebook.png
            └── footer.png
            └── hero.png
            └── home.png
            └── info.png
            └── instagram.png
            └── login.png
            └── logo.png
        └── 📁scripts
            └── inscripcion.js
            └── login.js
            └── perfil.js
            └── script.js
    └── server.js
    └── 📁views
        └── index.hbs
        └── 📁partials
            └── banner.hbs
            └── footer.hbs
            └── hero.hbs
            └── inscripcion.hbs
            └── login.hbs
            └── navbar.hbs
            └── perfil.hbs
            └── table.hbs
```


## Dependencias
```
  "dependencies": {
    "bootstrap": "^5.3.3",
    "express": "^4.19.2",
    "express-fileupload": "^1.5.0",
    "express-handlebars": "^7.1.3",
    "fs": "^0.0.1-security",
    "jsonwebtoken": "^9.0.2",
    "nodemon": "^3.1.4",
    "pg": "^8.12.0"
  }
```

## instalacion

```
 git clone https://github.com/VictorTapiaEgana/skatersfullstack.git
 npm install
 npm start
```

## Creacion de base de datos y tablas
```
CREATE DATABASE skatepark
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```
```
CREATE TABLE skaters (id SERIAL, 
					  email VARCHAR(50) NOT NULL, 
					  nombre VARCHAR(25) NOT NULL, 
					  password VARCHAR(25) NOT NULL, 
					  anos_experiencia INT NOT NULL, 
					  especialidad VARCHAR(50) NOT NULL, 
					  foto VARCHAR(255) NOT NULL, 
					  estado BOOLEAN NOT NULL
					 );
```

### Archivo de configuracion.

```
SERVER_PORT = 3010
SECRET_KEY = dEsAfIoLaTaM
DB_USER = postgres
DB_PASS = TU CONTRASEÑA DE BBDD
DB_NAME = skatepark
DB_HOST = localhost
DB_PORT = 5432

```
# Screenshots
## Index y listado de registros ingresados.
![](https://raw.githubusercontent.com/VictorTapiaEgana/skatersfullstack/master/github/index.png)

## Validacion de datos de ingreso.
![](https://raw.githubusercontent.com/VictorTapiaEgana/skatersfullstack/master/github/registro2.png)

## Creacion y confirmacion de registros.
![](https://raw.githubusercontent.com/VictorTapiaEgana/skatersfullstack/master/github/registro.png)

![](https://raw.githubusercontent.com/VictorTapiaEgana/skatersfullstack/master/github/tooltip.png)

## Login de usuarios.
![](https://raw.githubusercontent.com/VictorTapiaEgana/skatersfullstack/master/github/login.png)

## Edicion de perfil.
![](https://raw.githubusercontent.com/VictorTapiaEgana/skatersfullstack/master/github/edicion.png)

## Eliminacion de perfil.
![](https://raw.githubusercontent.com/VictorTapiaEgana/skatersfullstack/master/github/eliminar.png)




