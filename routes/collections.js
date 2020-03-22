const { Author } = require('../models/authors')
const { Collection, validate } = require('../models/collections')
const express = require('express')
const router = express.Router()

router.get( ('/'), async (req, res) => {
    const collections = await Collection.find().sort('name')
    res.send(collections)
})

router.post( ('/'), async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const author = await Author.findById(req.body.authorId)
    if (!author) return res.status(400).send('Author not found.')
    
    const collection = new Collection({
        title: req.body.title,
        author: {
            _id: author.id,
            name: author.name,
            phone: author.phone,
            website: author.website
        },
        InStock: req.body.InStock,
        dailyRentals: req.body.dailyRentals
    })
    collection = await collection.save()
    res.send(collection)
})

router.put( ('/:id'), async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const author = await Author.findById(req.body.authorId)
    if (!author) return res.status(400).send('Author not found.')

    const collection = new Collection.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        author: {
            _id: author.id,
            name: author.name,
            phone: author.phone,
            website: author.website
        },
        InStock: req.body.InStock,
        dailyRentals: req.body.dailyRentals
    },  { new: true } )

    if (!collection) res.status(400).send('The book collection cannot be found')

    res.send(collection)
})

router.delete( ('/:id'), async (req, res) => {
    const collection = await Collection.findByIdAndRemove(req.body.id)

    if (!collection) res.status(400).send('The collection with the given id was not found.')

    res.send(collection)
})

router.get( ('/:id'), async (req, res) => {
    const collection = await Collection.findById(req.params.id)
    
    if (!collection) res.status(400).send('The collection with the given id was not found.')
    
    res.send(collection)
})

exports.router = router