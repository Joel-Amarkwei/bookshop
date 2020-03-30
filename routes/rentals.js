const { Rental, validate } = require('../models/rentals')
const { Customer } = require('../models/customers')
const { Collection } = require('../models/collections')
const Fawn = require('fawn')
const mongoose = require('mongoose')
import express from 'express';
//const express = require('express')
const router = express.Router()

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut')
    res.send(rental)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) res.status(400).send('Invalid Customer.')
    
    const collection = await Collection.findById(req.body.collectionId)
    if (!collection) res.status(400).send('Invalid Collection. ')

    if (collection.InStock === 0 ) return res.status(400).send('The collection is out of stock')

    let rental = new Rental({
        collect: {
            _id: collection._id,
            title: collection.title,
            InStock: collection.InStock,
            dailyRental: collection.dailyRental
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        dateOut: {
            date: req.body.dateOut
        },
        dateReturn: {
            date: req.body.dateReturn
        },
        rentFee: {
            rentFee: req.body.rentFee
        }
    })
    try{
        new Fawn.Task()
        .save('rentals', rental)
        .update('collection', { _id: collection._id }, 
               { $inc: { InStock: - 1 } })
               .run()

        res.send(rental)

    } catch(ex){
        res.status(500).send('Something failed.')
    }
})

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    
    res.send(rental);
  });

module.exports = router