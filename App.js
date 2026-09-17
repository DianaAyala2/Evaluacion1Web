// Importamos Express para poder crear nuestro servidor
const express = require('express');
// Importamos las rutas de las incidencias
const rutasIncidencias = require('./routes/incidencias');

// Creamos nuestra aplicación de Express
const app = express();

// Middleware que permite recibir información en formato JSON
app.use(express.json());

// Conectamos las rutas de incidencias con nuestra aplicación
app.use("/", rutasIncidencias);

// Definimos el puerto donde funcionará nuestro servidor
const PORT = 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${3000}`);
});