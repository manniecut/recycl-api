const express = require('express');
const PickupsService = require('./pickups-service');

const pickupsRouter = express.Router();
const jsonParser = express.json();

pickupsRouter
    .route('/')
    .get((req, res, next) => {
        PickupsService.getAllPickups(req.app.get('db'))
            .then(pickups => {
                res.json(pickups)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { details, pickuplocation, pickupdate, client } = req.body
        const newPickup = { details, pickuplocation, pickupdate, client }
        for (const [key, value] of Object.entries(newPickup)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        PickupsService.insertPickup(
            req.app.get('db'),
            newPickup
        )
            .then(pickup => {
                res
                    .status(201)
                    .location(`/`)
                    .json(pickup)
            })
            .catch(next)
    })

pickupsRouter
    .route('/:userid')
    .all((req, res, next) => {
        PickupsService.getPickupByUserId(
            req.app.get('db'),
            req.params.userid
        )
        .then(pickup => {
            if (!pickup) {
                return res.status(404).json({
                    error: { message: `Pickups don't exist` }
                })
            }
            res.pickup = pickup
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.pickup)
    })
    // .delete((req, res, next) => {
    //     PickupsService.deletePickup(
    //         req.app.get('db'),
    //         req.params.pickupid
    //     )
    //     .then(numRowsAffected => {
    //         res.status(204).end()
    //     })
    //     .catch(next)
    // })

module.exports = pickupsRouter;