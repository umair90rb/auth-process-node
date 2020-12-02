const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Offer, validate, validateLocation} = require('../models/offer');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const offers = await Offer.find({ user: req.user._id });
    res.send(offers);
});

router.get('/:id', auth, async (req, res) => {
    const offer = await Offer.findById(req.params.id).populate('dog').populate('user').select('-__v');
    res.send(offer);
});


router.post('/', auth, async (req, res) => {

    const { e } = validateLocation(req.body.location);
    if(e) return res.status(400).send(e.details[0].message);
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    offer = new Offer(_.pick(req.body, ['name', 'type', 'sex', 'breed', 'price', 'location', 'breedType', 'age', 'noOfPuppies', 'registrationNoOfLitter', 'registrationNoOfPuppy', 'isFirstLitterSaleOfYear', 'isAnimalVaccinated', 'isAnimalMicrochipped', 'companyRegistration', 'more', 'dog']));
    offer.user = req.user._id;
    await offer.save();
 
    res.send(offer);

});

router.put('/:id', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Offer.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'type', 'sex', 'breed', 'price', 'location', 'breedType', 'age', 'noOfPuppies', 'registrationNoOfLitter', 'registrationNoOfPuppy', 'isFirstLitterSaleOfYear', 'isAnimalVaccinated', 'isAnimalMicrochipped', 'companyRegistration', 'more', 'dog']), {new:true});    
 
    res.send(result);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Offer.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;