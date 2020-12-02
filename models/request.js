const Joi = require('joi');
const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
});

const requestSchema = new mongoose.Schema({
    children:{
        type: [childrenSchema],
    },
    additionalPeople:{
        type: String,
    },
    responsibleForDogCare:{
        type: String,
        required: true
    },
    isAnyOneAlergic:{
        type: Boolean,
        required: true
    },
    isDogCareExperience:{
        type: Boolean,
        required: true
    },
    petCareIfUserIll:{
        type: String,
        required: true
    },
    whyPetAdopt:{
        type: String,
        required: true
    },
    houseType:{
        type: String,
        required: true
    },
    houseOwnedOrRent:{
        type: Boolean,
        required: true
    },
    haveAny:{
        type: String,
        required: true
    },
    haveHouseFence:{
        type: Boolean,
        required: true
    },
    whereDogSleepAtNight:{
        type: String,
        required: true
    },
    hoursDogAloneAtHome:{
        type: Number,
        required: true
    },
    whereHeLeftAlone:{
        type: String,
        required: true
    },
    howOftenDogExercised:{
        type: String,
        required: true
    },
    isFirstPet:{
        type: Boolean,
        required: true
    },
    haveOtherPet:{
        type: Boolean,
        required: true
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Request = mongoose.model('Request', requestSchema);

function validateChildren(child) {
    const schema = {
        name: Joi.string().required(),
        age: Joi.number().required()
    };

    return Joi.validate(child, schema);
}

function validateRequest(request) {
    const schema = {
        children: Joi.array(),
        additionalPeople: Joi.string().required(),
        responsibleForDogCare: Joi.string().required(),
        isAnyOneAlergic: Joi.any().allow('yes', 'no').required(),
        isDogCareExperience: Joi.any().allow('yes', 'no').required(),
        petCareIfUserIll: Joi.string().required(),
        whyPetAdopt: Joi.string().required(),
        houseType: Joi.string().required(),
        houseOwnedOrRent: Joi.any().allow('yes', 'no').required(),
        haveAny: Joi.string().required(),
        haveHouseFence: Joi.any().allow('yes', 'no').required(),
        whereDogSleepAtNight: Joi.string().required(),
        hoursDogAloneAtHome: Joi.number().required(),
        whereHeLeftAlone: Joi.string().required(),
        howOftenDogExercised: Joi.string().required(),
        isFirstPet: Joi.any().allow('yes', 'no').required(),
        haveOtherPet: Joi.any().allow('yes', 'no').required(),
        user: Joi.objectId()
    };

    return Joi.validate(request, schema);
}

exports.Request = Request;
exports.validate = validateRequest;
exports.validateChildren = validateChildren;