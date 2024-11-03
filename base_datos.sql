-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS boletas;

-- Usar la base de datos recién creada
USE boletas;

-- Crear la tabla boleta_servicio
CREATE TABLE IF NOT EXISTS boleta_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    boletaNum VARCHAR(255) NOT NULL,
    cliente VARCHAR(255) NOT NULL,
    tecnico VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    numeroIncidencia VARCHAR(255),
    modelo VARCHAR(255),
    serie VARCHAR(255),
    motivoServicio TEXT,
    condicionEquipo VARCHAR(255),
    accionTomada TEXT,
    motivoLlamada VARCHAR(255),
    ubicacionFalla VARCHAR(255),
    tipoFalla VARCHAR(255),
    horaInicialViaje TIME,
    horaFinalViaje TIME,
    horaInicialTrabajo TIME,
    horaFinalTrabajo TIME,
    checklistAmbiente JSON,
    checklistInsumos JSON,
    checklistUnidades JSON,
);


/*Usa estos comandos luego de crear la tabla*/

CREATE USER 'nuevo_usuario'@'localhost' IDENTIFIED BY 'contraseña_segura';

GRANT ALL PRIVILEGES ON boletas TO 'tu_usuario'@'localhost';
FLUSH PRIVILEGES;

ALTER USER 'tu_usuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tu_contraseña';
FLUSH PRIVILEGES;

GRANT INSERT ON boletas.boleta_servicio TO 'tu_usuario'@'localhost';
FLUSH PRIVILEGES;