require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');

require('./config/db.config')
require('./config/hbs.config')
require('./config/passport.config');

const sessionConfig = require('./config/session.config');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'))

app.use(sessionConfig);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

const router = require('./config/routes.config')
app.use('/', router)

// Error Middlewares
app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

app.use((error, req, res, next) => {
  let status =  error.status || 500;

  res.status(status).render('error', {
    message: error.message,
    error: req.app.get('env') === 'development' ? error : {}
  })

})

//listener
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`App listen on port ${port} 🚀`)
});