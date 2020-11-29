require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const users = require('./routes/users');
const auth = require('./routes/auth');
const messages = require('./routes/messages');
const posts = require('./routes/posts');

const express = require('express');
const app = express();

winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/dogluv'});


if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/dogluv')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(`Could not connect to MongoDb ${err} `));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/messages', messages);
app.use('/api/posts', posts);

//should be at last
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));