const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');


module.exports = function(){
    
    winston.handleExceptions(new winston.transports.File({ filename: 'log/uncaughtExceptions.log'}));

    process.on('unhandledRejection', (ex)=>{
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'log/logfile.log'});
    // winston.add(winston.add.MongoDB, {
    //     db: 'mongodb://localhost/dogluv',
    //     level: 'info'
    // });

}