const app = require('./app')
const { PORT } = require('./config')

app.listen(PORT, () => {
    console.log(`Server listenin' at http://localhost:${PORT}`)
})