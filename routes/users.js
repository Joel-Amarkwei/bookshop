const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/users')
const express = require('express')
const router = express.Router()

router.post( ('/'), async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (user) res.status(400).send('Email already exits.')

    const user = new User( _.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
    const salt = bcrypt.genSalt(7)
    user.password = bcrypt.hash(user.password, salt)

    details = await user.save()
    const token = user.generateAuthToken()

    res.header('y-auth-header', token).send(user)
})

module.exports = router