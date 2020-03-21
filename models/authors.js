const Joi = require('joi')
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 255 
    },
    phone: { 
        type: String, 
        required: true,
        minlength: 5, 
        maxlength: 128
    },
    website: { 
        type: String, 
        required: false,
        minlength: 10, 
        maxlength: 255 
     }
})

function validateAuthor(author){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(128).required(),
        website: Joi.string().min(10).max(255)
    }
    return Joi.validate(author, schema)
}

module.exports = authorSchema
module.exports = validateAuthor