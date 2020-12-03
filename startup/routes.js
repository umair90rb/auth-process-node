const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const messages = require('../routes/messages');
const posts = require('../routes/posts');
const packages = require('../routes/packages');
const profiles = require('../routes/profiles');
const dogs = require('../routes/dogs');
const payments = require('../routes/payments');
const services = require('../routes/services');
const requests = require('../routes/requests');
const offers = require('../routes/offers');
const uploads = require('../routes/uploads');
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use(express.static(__dirname + '/public'));

    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/messages', messages);
    app.use('/api/posts', posts);
    app.use('/api/packages', packages);
    app.use('/api/profile', profiles);
    app.use('/api/dogs', dogs);
    app.use('/api/payments', payments);
    app.use('/api/services', services);
    app.use('/api/requests', requests);
    app.use('/api/offers', offers);
    app.use('/api/uploads', uploads);

    //should be at last
    app.use(error);
}