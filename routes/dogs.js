const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Dog, validate} = require('../models/dog');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const dogs = await Dog.find({ user: req.user._id });
    res.send(dogs);
});

router.get('/:id', auth, async (req, res) => {
    const dog = await Dog.findById(req.params.id).select('-__v');
    res.send(dog);
});


router.post('/', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    dog = new Dog(_.pick(req.body, ['name', 'age', 'localization', 'sex', 'breed', 'description', 'avatar']));
    dog.user = req.user._id;
    await dog.save();
 
    res.send(_.omit(dog, ['user', '__v',]));

});

router.put('/:id', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Dog.findByIdAndUpdate(req.params.id, _.pick(req.body, ['name', 'age', 'localization', 'sex', 'breed', 'description', 'avatar']), {new:true});    
 
    res.send(result);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Dog.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;