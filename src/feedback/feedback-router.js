const express = require('express');
const FeedbackService = require('./feedback-service');

const feedbackRouter = express.Router();
const jsonParser = express.json();

feedbackRouter
    .post('/', jsonParser, (req, res, next) =>{

    })


module.exports = feedbackRouter;