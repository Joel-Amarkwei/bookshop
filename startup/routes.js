const express = require('express')
const authors = require('../routes/authors')
const collections = require('../routes/collections') 
const customers = require('../routes/customers')
const login = require('../routes/login')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const errors = require('../middlewares/error')

module.exports = function(app){
    app.use(express.json())
    app.use('/api/authors', authors)
    app.use('/api/collections', collections)
    app.use('/api/customers', customers)
    app.use('/api/login', login)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/errors', errors)
}
