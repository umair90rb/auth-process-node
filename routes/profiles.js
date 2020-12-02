const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Profile, validate} = require('../models/profile');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const profile = await Profile.find({ user: req.user._id }).select();
    res.send(profile);
});

router.get('/full', auth, async (req, res) => {
    const profile = await Profile.find({ user: req.user._id }).populate('user', 'email location');
    res.send(profile);
});

router.post('/', auth, async (req, res) => {
    

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    profile = new Profile(_.pick(req.body, ['name', 'age', 'location', 'avatar']));
    profile.user = req.user._id;
    await profile.save();
 
    res.send(_.omit(profile, ['user', '__v',]));

});

router.put('/', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Profile.findOneAndUpdate({ user: req.user._id}, _.pick(req.body, ['name', 'age', 'location', 'avatar']), {new:true});    
 
    res.send(result);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Profile.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;