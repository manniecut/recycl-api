const express = require('express');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter
    .post('/', jsonParser, (req, res, next) =>{

    })


module.exports = usersRouter;