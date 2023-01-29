const express = require('express');
const router = express.Router();
const auth = require("../auth/AuthAPI")

const ControllerProducts = require('../controllers/ControllerProducts');

const ControllerCedulas = require('../controllers/ControllerCedulas');

module.exports = function () {

    /** APIREST Para listar los productos.**/
    router.get('/Products', ControllerProducts.ListProducts)

    /** APIREST Para listar los productos por un id.**/
    router.get('/Product/:id', ControllerProducts.ProductID)

    /** APIREST Para eliminar un producto por un id.**/
    router.get('/DeleteProduct/:id', auth, ControllerProducts.DeleteProduct)

    /** APIREST Para agregar un producto por medio de un req.body.**/
    router.post('/AddProduct', auth, ControllerProducts.AddProduct)

    /** APIREST Para eliminar un producto por un id.**/
    router.get('/Ced/:id', ControllerCedulas.ListCedulas) 


    return router;
}