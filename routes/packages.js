const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {Package, validate} = require('../models/package');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const pkgs = await Package.find().select(['-__v']);
    res.send(pkgs);
});

router.get('/:id', auth, async (req, res) => {
    const pkg = await Package.findById(req.params.id).select(['-__v']);
    res.send(pkg);
});

router.post('/', [auth, admin], async (req, res) => {
    
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    pkg = new Package(_.pick(req.body, ['name', 'price', 'validFor', 'image']));
    
    await pkg.save();

    res.send(_.pick(pkg, ['_id', 'name']));

});


router.put('/:id', [auth, admin], async (req, res) => {

    
    p = _.pick(req.body, ['name', 'price', 'validFor', 'image']);

    // p.user = req.user._id;
    // const result = await Package.update({ _id: req.params.id}, _.pick(req.body, ['name', 'price', 'validFor', 'image']));
    
    const pkg = await Package.findById(req.params.id);
    if(!pkg) return res.status(404).send('Document not found!');

    const { error } = validate(p);
    if(error) return res.status(400).send(error.details[0].message);
    
    
    pkg.set(p);
    
    await pkg.save();
    res.send(_.pick(pkg, ['_id', 'name']));
    // if(!result.nModified) return res.send('Document updated failed.');
    // res.send('Document updated.');

});


router.delete('/:id', [auth, admin], async (req, res) => {

    const result = await Package.deleteOne({_id:req.params.id});
    if(result.n && result.ok) return res.send('Document deleted.');

    res.send('Something wrong.');

});

module.exports = router;