const Joi = require('joi');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    message:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }, 
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Message = mongoose.model('Message', messageSchema);

function validateMessage(message) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        message: Joi.string().min(5).max(1024).required(),
        user: Joi.objectId().required()
    };

    return Joi.validate(message, schema);
}

exports.Message = Message;
exports.validate = validateMessage;