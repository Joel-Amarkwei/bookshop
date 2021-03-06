const _ = require('lodash')
const { Author, validate } = require('../models/authors')
const validateObjectID = require('../middlewares/objectID')
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const authors = await Author.find().sort('name')
    res.send(authors)
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let author = new Author( _.pick(req.body, ['name', 'website', 'phone', 'available']))
    author = await author.save()

    res.send(author)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    const author = await Author.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        website: req.body.website,
        available: req.body.available
    },  { new: true })

    if (!author) return res.status(400).send('The Author with the given ID was not found.')
    
    res.send(author)
})

router.delete('/:id', validateObjectID, [auth, admin], async (req, res) => {
    const author = await Author.findByIdAndRemove(req.params.id)

    if (!author) return res.status(400).send('The Author with the given ID was not found.')
    res.send(author)
})

router.get('/:id', validateObjectID, async (req, res) => {
    const author = await Author.findById(req.params.id)
    
    if (!author) return res.status(400).send('The Author with the given ID was not found.')
    res.send(author)
})

module.exports = router