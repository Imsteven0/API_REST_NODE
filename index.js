const express = require('express');
const routes = require('./routes');
const cors = require('cors');

//Crear el servidor
const app = express();

//Hablilitar CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Rutas de la App
app.use('/', routes());

//Direccion
app.listen(5000, () => { console.log("Servidor corriendo en el puerto 5000") });



