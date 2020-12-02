const Joi = require('joi');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    lat:{
        type: Number,
        required: true
    },
    long:{
        type: Number,
        required: true
    }
});

const offerSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    type:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    location:{
        type: locationSchema,
        required: true
    },
    breedType:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    noOfPuppies:{
        type: Number,
        required: true
    },
    registrationNoOfLitter:{
        type: String,
        required: true
    },
    registrationNoOfPuppy:{
        type: String,
        required: true
    },
    isFirstLitterSaleOfYear:{
        type: Boolean,
        required: true
    },
    isAnimalVaccinated:{
        type: Boolean,
        required: true
    },
    isAnimalMicrochipped:{
        type: Boolean,
        required: true
    },
    companyRegistration:{
        type: String,
        required: true
    },
    more:{
        type: String,
    },
    dog:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Offer = mongoose.model('Offer', offerSchema);

function validateOffer(offer) {
    const schema = {
        name: Joi.string().required(),
        type: Joi.any().allow('adoption', 'sale').required(),
        sex: Joi.any().allow('male', 'female').required(),
        breed: Joi.string().required(),
        price: Joi.number().required(),
        location: Joi.object().required(),
        breedType: Joi.string().required(),
        age: Joi.number().required(),
        noOfPuppies: Joi.number().required(),
        registrationNoOfLitter:Joi.string().required(),
        registrationNoOfPuppy: Joi.string().required(),
        isFirstLitterSaleOfYear: Joi.any().allow('yes', 'no').required(),
        isAnimalVaccinated: Joi.any().allow('yes', 'no').required(),
        isAnimalMicrochipped: Joi.any().allow('yes', 'no').required(),
        companyRegistration: Joi.string().required(),
        more: Joi.string().empty(''),
        dog: Joi.objectId(),
        user: Joi.objectId()
    };

    return Joi.validate(offer, schema);
}

function validateLocation(location) {
    const schema = {
        lat: Joi.number().required(),
        long: Joi.number().required()
    }

    return Joi.validate(location, schema);
}

exports.Offer = Offer;
exports.validate = validateOffer;
exports.validateLocation = validateLocation;