const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 128
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
})

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(8).max(128).required(),
        password: Joi.string().min(5).max(50).required(),
        isAdmin: Joi.boolean()
    }
    return Joi.validate(user, schema)
}

module.exports = User
module.exports = validateUser