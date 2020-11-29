const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const _ = require('lodash');
const {Message, validate} = require('../models/message');
const express = require('express');
const router = express.Router();

router.get('/:id', [auth, admin], async (req, res) => {
    
        const message = await Message.findById(req.params.id).populate('user', 'email location -_id').select('email message user');
        res.send(message);
   
});

router.post('/', auth, async (req, res) => {
    
    msg = _.pick(req.body, ['firstName', 'lastName', 'email', 'message']);
    msg.user = req.user._id;
    const { error } = validate(msg);
    if(error) return res.status(400).send(error.details[0].message);
    // console.log(msg);
    message = new Message(msg);
    
    await message.save();

    
    res.send(_.pick(message, '_id'));

});

module.exports = router;