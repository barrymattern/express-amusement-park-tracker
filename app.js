const express = require('express');

const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(routes);
app.use((req,res,next) => {
    const error = new Error("The requests page couldn't be found.");
    error.status = 404
    next(error)
})

app.use((err,req,res,next) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
        // this is where the error would go for database
    } else {
        console.log(err)
    }
    next(err)
})




module.exports = app;
