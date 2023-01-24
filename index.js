const express = require('express');
const routes = require('./routes');
require('dotenv').config();

//Crear el servidor
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas de la App
app.use('/', routes());

//Direccion
app.listen(process.env.PORT, () => { console.log("Servidor corriendo en el puerto: " + process.env.PORT) });



