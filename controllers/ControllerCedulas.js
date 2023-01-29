const axios = require('axios');
const jsonFormatter = require('json-formatter-js');
const { json } = require('express');

exports.ListCedulas = async (req, res, next) => {
    axios.get('https://apis.gometa.org/cedulas/' + req.params.id)
        .then(response => {
            res.status(200).json(response.data)
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
};

