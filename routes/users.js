const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/users');
import { express } from 'express'
//const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send('Email already exits.');
    
     user =  new User( _.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(4);
    user.password = await bcrypt.hash(user.password, salt);
    
    details = await user.save();
    const token = user.generateAuthToken();

    res.header('y-auth-header', token).send( _.pick(req.body, ['name', 'email', 'isAdmin']));
})

module.exports = router;