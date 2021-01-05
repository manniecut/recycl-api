const express = require('express');
const PickupsService = require('./pickups-service');

const pickupsRouter = express.Router();
const jsonParser = express.json();

pickupsRouter
    .post('/', jsonParser, (req, res, next) =>{

    })


module.exports = pickupsRouter;