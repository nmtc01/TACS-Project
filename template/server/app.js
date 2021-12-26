const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// #IMPORTS -> TODO
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const friendshipsRouter = require('./routes/friendships');

const app = express();

let tries = 5; 
while (tries > 0) {
  const set = true;
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log("--- Successfully connected to the database ---")
    })
    .catch((err) => {
      console.error(err)
      if (tries == 0) {
        console.error("Could not connect to database")
        process.exit()
      } else {
        console.log("--- Could not connect to the database, retrying in 5 seconds ---")
        const waitTill = new Date(new Date().getTime() + 5 * 1000);
        while (waitTill > new Date()) { }
      } 
      set = false;
    })

  if (set) {
    mongoose.set("useFindAndModify", false)
    break;
  }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// #USE_ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/friendships', friendshipsRouter);

module.exports = app;
