# Proyecto Boletas

## Descripción
Este proyecto es una aplicación web para gestionar boletas de servicio. Permite a los usuarios llenar un formulario y guardar la información en una base de datos MySQL.

## Requisitos
- **Node.js**: Asegúrate de tener instalado Node.js en tu sistema. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **MySQL**: Necesitarás tener un servidor MySQL corriendo. Puedes instalarlo desde [mysql.com](https://www.mysql.com/downloads/).

## Instalación
1. **Clona el repositorio** o descarga los archivos del proyecto en tu máquina local.
   
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd proyecto-boleta

2. **Abre una terminal** y navega al directorio del proyecto.
3. **Instala las dependencias** ejecutando el siguiente comando:
    npm install express mysql body-parser


## Configuración de la Base de Datos
1. Abre **MySQL Workbench** y conéctate a tu servidor MySQL.
2. Ejecuta el siguiente script SQL para crear la base de datos y la tabla:

CREATE DATABASE boletas;

USE boletas;

CREATE TABLE boleta_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    boletaNum VARCHAR(50),
    nombre VARCHAR(100),
    email VARCHAR(100),
    fecha DATE,
    horas INT,
    checklist BOOLEAN
);

Esto creará la base de datos llamada **boletas** y la tabla **boleta_servicio**.

## Ejecutar el Proyecto
1. **Inicia el servidor** ejecutando el siguiente comando en la terminal:
    node server.js

2. **Abre un navegador web** y accede a la siguiente dirección:
    http://localhost:3000
Esto cargará la aplicación y te permitirá llenar el formulario de boleta.

## Ejemplos de Uso
1. Completa los campos del formulario y haz clic en "Enviar Boleta".
2. Verifica que los datos se hayan guardado en la base de datos boletas en MySQL.

## Notas Adicionales
- Si experimentas problemas de conexión con la base de datos, asegúrate de que las credenciales en server.js sean correctas y que el servidor MySQL esté en funcionamiento.
- Si tienes dudas o necesitas ayuda adicional, no dudes en contactarme.