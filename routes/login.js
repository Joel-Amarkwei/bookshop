const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { User } = require('../models/users')
import express from 'express'
//const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)
    
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')
  
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()
    res.header('y-auth-header', token).send(token)
})

function validate(login){
    const schema = {
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(login, schema)
}

module.exports = router