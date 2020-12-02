const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Request, validate, validateChildren} = require('../models/request');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const requests = await Request.find({ user: req.user._id });
    res.send(requests);
});

router.get('/:id', auth, async (req, res) => {
    const request = await Request.findById(req.params.id).populate('user', '_id email location').select('-__v');
    res.send(request);
});


router.post('/', auth, async (req, res) => {

    // res.send(req.body.children);return;

    if(req.body.children.length > 0) req.body.children.forEach(child => {
        const { e } = validateChildren(child);
        if(e) return res.status(400).send(e.details[0].message);
            
    }); 

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    request = new Request(_.pick(req.body, ['children', 'additionalPeople', 'responsibleForDogCare', 'isAnyOneAlergic', 'isDogCareExperience', 'petCareIfUserIll', 'whyPetAdopt', 'houseType', 'houseOwnedOrRent', 'haveAny', 'haveHouseFence', 'whereDogSleepAtNight', 'hoursDogAloneAtHome', 'whereHeLeftAlone', 'howOftenDogExercised', 'isFirstPet', 'haveOtherPet']));
    request.user = req.user._id;
    await request.save();
 
    res.send(request);

});

router.put('/:id', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Request.findByIdAndUpdate(req.params.id, _.pick(req.body, ['children', 'additionalPeople', 'responsibleForDogCare', 'isAnyOneAlergic', 'isDogCareExperience', 'petCareIfUserIll', 'whyPetAdopt', 'houseType', 'houseOwnedOrRent', 'haveAny', 'haveHouseFence', 'whereDogSleepAtNight', 'hoursDogAloneAtHome', 'whereHeLeftAlone', 'howOftenDogExercised', 'isFirstPet', 'haveOtherPet']), {new:true});    
 
    res.send(result);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Dog.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;