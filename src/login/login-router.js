const express = require('express');
const LoginService = require('./login-service');

const loginRouter = express.Router();
const jsonParser = express.json();

loginRouter
    .post('/', jsonParser, (req, res, next) =>{

    })


module.exports = loginRouter;