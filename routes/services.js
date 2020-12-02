const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Service, validate} = require('../models/service');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const services = await Service.find({ user: req.user._id });
    res.send(services);
});

router.get('/:id', auth, async (req, res) => {
    const service = await Service.findById(req.params.id).populate('user', '_id email location').select('-__v');
    res.send(service);
});


router.post('/', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    service = new Service(_.pick(req.body, ['type', 'name', 'activity', 'address', 'discountCode', 'more', 'image']));
    service.user = req.user._id;
    await service.save();
 
    res.send(service);

});

router.put('/:id', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Service.findByIdAndUpdate(req.params.id, _.pick(req.body, ['type', 'name', 'activity', 'address', 'discountCode', 'more', 'image']), {new:true});    
 
    res.send(result);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Dog.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;