var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
//ROUTE_IMPORTS

var app = express();
app.use(cors());

var tries = 5; 
while (tries > 0) {
  var set = true;
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
        var waitTill = new Date(new Date().getTime() + 5 * 1000);
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

app.use('/', indexRouter);
//ROUTE_USES

module.exports = app;
