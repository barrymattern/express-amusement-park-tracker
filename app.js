const express = require('express');

const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(routes);
app.use((req,res,next) => {
    const err = new Error("The requests page couldn't be found.");
    err.status = 404
    next(err)
})

app.use((err,req,res,next) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
        // this is where the error would go for database
    } else {
        console.log(err)
    }
    next(err)
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', { title: 'Page Not Found' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (!err.status) {
    res.status(500);
  } else {
    res.status(err.status);
  }

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    err.message = null;
    err.stack = null;
  }
  
  res.render('error', {
    title: 'Server Error',
    message: err.message,
    stack : err.stack
  });
});


module.exports = app;
