const express = require('express');
const RecyclablesService = require('./recyclables-service');

const recyclablesRouter = express.Router();
const jsonParser = express.json();

recyclablesRouter
    .post('/', jsonParser, (req, res, next) =>{

    })


module.exports = recyclablesRouter;