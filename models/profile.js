const Joi = require('joi');
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 255,
    },
    age:{
        type: Number,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Profile = mongoose.model('Profile', profileSchema);

function validateProfile(profile) {
    const schema = {
        name: Joi.string().max(255).required(),
        age: Joi.number().required(),
        location: Joi.string().required(),
        avatar: Joi.string(),
        user: Joi.objectId().required()
    };

    return Joi.validate(profile, schema);
}

exports.Profile = Profile;
exports.validate = validateProfile;