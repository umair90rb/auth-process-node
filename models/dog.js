const Joi = require('joi');
const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    avatar:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
        maxlength: 255,
    },
    age:{
        type: Number,
        required: true,
    },
    sex:{
        type: String,
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    localization:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Dog = mongoose.model('Dog', dogSchema);

function validateDog(dog) {
    const schema = {
        avatar: Joi.string().required(),
        name: Joi.string().max(255).required(),
        age: Joi.number().required(),
        sex: Joi.string().required(),
        breed: Joi.string().required(),
        localization: Joi.string().required(),
        description: Joi.string().required(),
        user: Joi.objectId()
    };

    return Joi.validate(dog, schema);
}

exports.Dog = Dog;
exports.validate = validateDog;