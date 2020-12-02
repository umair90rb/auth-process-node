const Joi = require('joi');
const mongoose = require('mongoose');


const packageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        required: true,
        type: Number,
        min: 0
    },
    validFor:{
        required: true,
        type: Number
    },
    image:{
        required: true,
        type: String
    }
});

const Package = mongoose.model('Package', packageSchema);

function validatePackage(package) {
    const schema = {
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        validFor: Joi.number().required(),
        image: Joi.string()    
    };

    return Joi.validate(package, schema);
}

exports.Package = Package;
exports.validate = validatePackage;