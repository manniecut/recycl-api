require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const loginRouter = require('./login/login-router')
const usersRouter = require('./users/users-router')
const recyclablesRouter = require('./recyclables/recyclables-router')
const pickupsRouter = require('./pickups/pickups-router')
const feedbackRouter = require('./feedback/feedback-router')

const app = express()



/***** MIDDLEWARE *****/

const morganOption = (NODE_ENV === 'production') ? 'tiny' : "common";
app.use(morgan(morganOption)) // for logging, it switches modes automatically based on NODE_ENV
app.use(helmet()) // for increasing security by handling the setting of HTTP headers
app.use(cors()) // for enabling cross origin resource sharing, for clients to access data from other servers



/***** ENDPOINT ROUTING *****/
// These are the various endpoints in the API

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/recyclables', recyclablesRouter)
app.use('/api/pickups', pickupsRouter)
app.use('/api/feedback', feedbackRouter)



/***** QUICK DIAGNOSTICS *****/

// Simple get response for info on the server's status 
app.get('/health', (req, res, next) => {
    res.send('Server is active');
})

// Error handler
app.use((error, req, res, next) => {
    console.log("server error:", error.message);
    res.status(error.status || 500).json({ error: error.message, }); next();
});


module.exports = app;