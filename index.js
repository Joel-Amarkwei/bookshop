const winston = require('winston')
const express = require('express')
const app = express()

require('./startup/configuration')()
require('./startup/db')()
require('./startup/validation')()
require('./startup/routes')(app)
require('./startup/logging')()

const port = process.env.PORT || 5000
app.listen(port, () => winston.info(`Listening at port: ${port}...`) )
