const Joi = require('joi')
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    isGold: {
        type: Boolean,
        default: false
    }
}))

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(8).max(100).required(100),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer