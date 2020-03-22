const Joi = require('joi')
const mongoose = require('mongoose')
const { authorSchema } = require('./authors')

const Collection = mongoose.model('Collections', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    author: {
        type: authorSchema,
        required: true
    },
    InStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentals: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 200
    }
}))

function validateCollection(collection){
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        authorId: Joi.objectId().required(),
        dailyRentals: Joi.number().min(0).max(200).required(),
        InStock: Joi.number().min(0).max(255).required()
    }
    return Joi.validate(collection, schema)
}

exports.Collection = Collection
exports.validate = validateCollection