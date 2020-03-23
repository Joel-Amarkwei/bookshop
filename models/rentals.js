const Joi = require('joi')
const mongoose = require('mongoose')

const Rental = mongoose.model('Rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    collect: {
        type: new mongoose.Schema({
            title: {
                type: String,
                trim: true,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            InStock: {
                type: Number,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentals: {
                type: Number,
                required: true,
                minlength: 5,
                maxlength: 200
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateReturn: {
        type: Date,
        required: false
    },
    rentFee: {
        type: Number,
        min: 0
    }
}))

function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(),
        collectionId: Joi.objectId().required()
    }
    return Joi.validate(rental, schema)
}

exports.Rental = Rental
exports.validate = validateRental