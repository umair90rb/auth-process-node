const Joi = require('joi');
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    amount:{
        type: Number,
        required: true,
    },
    region:{
        type: String,
        required: true
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

function validatePayment(payment) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        amount: Joi.number().required(),
        region: Joi.string().required(),
        user: Joi.objectId()
    };

    return Joi.validate(payment, schema);
}

exports.Payment = Payment;
exports.validate = validatePayment;