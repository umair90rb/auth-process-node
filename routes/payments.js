const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Payment, validate} = require('../models/payment');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const payments = await Payment.find({ user: req.user._id });
    res.send(payments);
});

router.get('/:id', auth, async (req, res) => {
    const payment = await Payment.findById(req.params.id).select('-__v');
    res.send(payment);
});


router.post('/', auth, async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    payment = new Payment(_.pick(req.body, ['email', 'region', 'amount']));
    payment.user = req.user._id;
    await payment.save();
 
    res.send(_.pick(payment, ['_id', 'email', 'amount']));

});

router.put('/:id', [auth, admin], async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Payment.findByIdAndUpdate(req.params.id, _.pick(req.body, ['email', 'region', 'amount']), {new:true});    
 
    res.send(result);

});

router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Payment.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;