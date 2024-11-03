const express = require('express');  // Importa el framework Express para crear el servidor web
const bodyParser = require('body-parser');// Importa body-parser para manejar datos enviados en las solicitudes HTTP (formularios)
const mysql = require('mysql');// Importa la biblioteca MySQL para conectar y realizar consultas a la base de datos MySQL
const fs = require('fs'); // Importa el módulo fs (file system) para trabajar con archivos en el servidor

const app = express();// Crea una instancia de Express
const port = 3050; // Define el puerto en el que el servidor escuchará las solicitudes

// Conexión a la base de datos MySQL
// Configura los parámetros de conexión a la base de datos MySQL. Aquí se definen:
const db = mysql.createConnection({
    host: 'localhost',
    user: 'usuario1', //Debes asignar un usuario a tu base de datos
    password: '1234', //Debes asignar una contraseña para ese usuario
    database: 'boletas'
});

// Realiza la conexión a la base de datos. Si ocurre un error, se lanza una excepción.
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Configurar body-parser
// Body-parser analiza los datos enviados por el cliente en las solicitudes HTTP (usando `application/x-www-form-urlencoded` y `application/json`).
// 1. `urlencoded`: Permite analizar datos enviados en formularios HTML.
// 2. `json`: Permite analizar datos enviados en formato JSON.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ruta para manejar el envío del formulario
// Cuando el cliente envía el formulario, se recibe una solicitud POST en la ruta `/enviar-boleta`.
// Los datos del formulario se extraen del cuerpo de la solicitud (`req.body`) y se guardan en la base de datos y en un archivo de texto.
app.post('/enviar-boleta', (req, res) => {
     // Los datos del formulario se almacenan en el objeto `boletaData`.
    // Se extraen y asignan los valores de cada campo del formulario, incluido un checklist convertido en una cadena JSON.
    const boletaData = {
        boletaNum: req.body.boletaNum,  // Este campo es 'readonly', asegúrate de generarlo correctamente
        cliente: req.body.cliente,
        tecnico: req.body.tecnico,
        fecha: req.body.fecha,
        numeroIncidencia: req.body.numeroIncidencia,
        modelo: req.body.modelo,
        serie: req.body.serie,
        motivoServicio: req.body.motivoServicio,
        condicionEquipo: req.body.condicionEquipo,
        accionTomada: req.body.accionTomada,
        motivoLlamada: req.body.motivoLlamada,
        ubicacionFalla: req.body.ubicacionFalla,
        tipoFalla: req.body.tipoFalla,
        horaInicialViaje: req.body.horaInicialViaje,
        horaFinalViaje: req.body.horaFinalViaje,
        horaInicialTrabajo: req.body.horaInicialTrabajo,
        horaFinalTrabajo: req.body.horaFinalTrabajo,
        checklistAmbiente: JSON.stringify(req.body.checklistAmbiente || []),
        checklistInsumos: JSON.stringify(req.body.checklistInsumos || []),
        checklistUnidades: JSON.stringify(req.body.checklistUnidades || []),
    };
// SQL para insertar los datos de la boleta en la tabla 'boleta_servicio'
    const sql = 'INSERT INTO boleta_servicio SET ?';
    // Ejecutar la consulta SQL para insertar los datos en la base de datos
    db.query(sql, boletaData, (error, results) => {
        if (error) {
            console.error('Error al insertar la boleta:', error);
            return res.status(500).send('Error al enviar la boleta de servicio');
        }

        // Crear o actualizar el archivo boletas.txt
        const boletaString = JSON.stringify(boletaData, null, 2) + '\n'; // Formato de la boleta
        fs.appendFile('boletas.txt', boletaString, (err) => {
            if (err) {
                console.error('Error al guardar en el archivo:', err);
                return res.status(500).send('Error al enviar la boleta de servicio');
            }
            res.send('Boleta de Servicio enviada exitosamente y guardada en boletas.txt');
        });
    });
});

// Iniciar el servidor
// Se inicia el servidor Express para escuchar las solicitudes en el puerto 3020.
// Una vez iniciado, se imprime un mensaje en la consola con la URL del servidor.
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
