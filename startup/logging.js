const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports = function(){
    
    winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/dogluv'});
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'log/uncaughtExceptions.log'}));


    process.on('unhandledRejection', (ex)=>{
        throw ex;
        // console.log('WE GOT AN UNCUGHT EXCEPTION');
        // winston.error(ex.message, ex);
    });

}