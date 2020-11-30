const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const messages = require('../routes/messages');
const posts = require('../routes/posts');
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/messages', messages);
    app.use('/api/posts', posts);
    //should be at last
    app.use(error);
}