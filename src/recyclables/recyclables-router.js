const express = require('express');
const xss = require('xss');
const RecyclablesService = require('./recyclables-service');

const recyclablesRouter = express.Router();
const jsonParser = express.json();

const sterilizeRec = rec => ({
    title: xss(rec.title)
})


recyclablesRouter
    .route('/')
    .get((req, res, next) => {
        RecyclablesService.getAllRecs(req.app.get('db'))
            .then(recs => {
                res.json(recs)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { title } = req.body
        const newRec = { title }
        if (newRec.title == null) {
            return res.status(400).json({
                error: { message: `Missing recyclable 'title' in request body` }
            })
        }
        RecyclablesService.insertRec(
            req.app.get('db'),
            sterilizeRec(newRec)
        )
            .then(rec => {
                res
                    .status(201)
                    .location('/')
                    .json(sterilizeRec(rec))
            })
            .catch(next)
    })

recyclablesRouter
    .route('/:recid')
    .delete((req, res, next) => {
        RecyclablesService.deleteRec(
            req.app.get('db'),
            req.params.recid
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })


module.exports = recyclablesRouter;