const Joi = require('joi');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    activity:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    discountCode:{
        type: String,
    },
    more:{
        type: String,
    },
    image:{
        type: String
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Service = mongoose.model('Service', serviceSchema);

function validateService(service) {
    const schema = {
        type: Joi.string().required(),
        name: Joi.string().required(),
        activity: Joi.string().required(),
        address: Joi.string().required(),
        discountCode: Joi.string(),
        more: Joi.string(),
        image: Joi.string(),
        user: Joi.objectId()
    };

    return Joi.validate(service, schema);
}

exports.Service = Service;
exports.validate = validateService;