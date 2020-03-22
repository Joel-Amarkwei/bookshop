const _ = require('lodash')
const { Customer, validate } = require('../models/customers')
const express = require('express')
const router = express.Router()

router.get( ('/'), async (req, res) => {
    const customer = await Customer.find().sort('name')
    res.send(customer)
})

router.post( ('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = new Customer( _.pick(req.body, ['name', 'phone', 'isGold']))
    customer = await customer.save()
    res.send(customer)
}))

router.put( ('/:id'), async (req, res) => {
    const customer = await Customer.findOneAndUpdate(req.body.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.phone
    }, { new: true})

    if (!customer) res.status(400).send('Invalid customer Id.')
    customer = await customer.save()
    res.send(customer)
})

router.delete( ('/:id'), async (req, res) => {
    const customer = await Customer.findOneAndRemove(req.body.id)
    
    if (!customer) res.status(400).send('Invalid customer Id.')
    res.send(customer)
})

router.get( ('/:id'), async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    res.send(customer)
    
    if (!customer) res.status(400).send('Invalid customer Id.')
})

module.exports = router