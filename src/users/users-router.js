const express = require('express');
const xss = require('xss');
const UsersService = require('./users-service');

const usersRouter = express.Router();
const jsonParser = express.json();

const sterlizeUser = user => ({
    id: user.id,
    username: xss(user.username),
    pass: xss(user.pass),
    joindate: user.joindate,
    isadmin: user.isadmin,
    email: user.email,
    pickuplocation: xss(user.pickuplocation)
})

// removes any sensitive information from the response
const secureResponse = (users) => {
    secureUsers = []
    users = users.forEach(user => {
        delete user.pass
        delete user.joindate
        delete user.isadmin
        delete user.email
        delete user.pickuplocation
        secureUsers.push(user)
    })
    return secureUsers
}

const secureIndividual = (user) => {
    secureUser = []
    delete user.pass
    secureUser.push(user)
    return secureUser
}

usersRouter
    .route('/')
    .get((req, res, next) => { // retrieve all users from DB
        UsersService.getAllUsers(req.app.get('db'))
            .then(users => {
                res.json(secureResponse(users))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => { // add a new user to DB
        const { username, pass, email, pickuplocation } = req.body
        const newUser = { username, pass }
        for (const [key, value] of Object.entries(newUser)) { // check for required fields
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        newUser.email = email
        newUser.pickuplocation = pickuplocation
        UsersService.insertUser( // insert new user into DB
            req.app.get('db'),
            newUser
        )
            .then(user => {
                res
                    .status(201)
                    .location(`/`)
                    .json(sterlizeUser(user))
            })
            .catch(next)
    })

usersRouter
    .route('/:username')
    .all((req, res, next) => { // retrieve specific user by username
        UsersService.getByName(
            req.app.get('db'),
            req.params.username
        )
            .then(user => { // send error if user doesn't exist
                if (!user) {
                    return res.status(404).json({
                        error: { message: `User doesn't exist` }
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(secureIndividual(sterlizeUser(res.user)))
    })
    .delete((req, res, next) => { // delete specific user from DB
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.userid
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => { // update specific user in DB
        const { email, pickuplocation } = req.body
        const userToUpdate = { email, pickuplocation }
        if (!userToUpdate) // return error if missing
            return res.status(400).json({
                error: {
                    message: `Nothing to update`
                }
            })
        UsersService.updateUser( // patch user in DB
            req.app.get('db'),
            req.params.username,
            userToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = usersRouter;