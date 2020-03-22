require('express-async-errors')
require('winston-mongodb')
const winston = require('winston')

module.exports = function(){
    //handling uncaughtExceptions and unhandledRejections
    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtException.log' }),
        new winston.transports.Console({ colorize: true, pettyPrint: true }),

        process.on('unhandledRejection', (ex) => {
            throw ex
        }),

        winston.add(winston.transports.File, { filename: 'logfile.log' }),
        winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/Bookshop', level: 'info' })
    )
}