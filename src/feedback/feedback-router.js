const express = require('express');
const FeedbackService = require('./feedback-service');

const feedbackRouter = express.Router();
const jsonParser = express.json();

feedbackRouter
    .route('/')
    .get((req, res, next) => {
        FeedbackService.getAllFeedback(req.app.get('db'))
            .then(feedback => {
                res.json(feedback)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { msg, sender } = req.body
        const newFeedback = { msg, sender }
        for (const [key, value] of Object.entries(newFeedback)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        FeedbackService.insertFeedback(
            req.app.get('db'),
            newFeedback
        )
            .then(feedback => {
                res
                    .status(201)
                    .location(`/`)
                    .json(feedback)
            })
            .catch(next)
    })

feedbackRouter
    .route('/:feedbackid')
    .all((req, res, next) => {
        FeedbackService.getFeedbackById(
            req.app.get('db'),
            req.params.feedbackid
        )
        .then(feedback => {
            if (!feedback) {
                return res.status(404).json({
                    error: { message: `This feedback doesn't exist` }
                })
            }
            res.feedback = feedback
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.feedback)
    })
    .delete((req, res, next) => {
        FeedbackService.deleteFeedback(
            req.app.get('db'),
            req.params.feedbackid
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = feedbackRouter;