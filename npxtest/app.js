var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var earthquakesRouter = require('./routes/earthquake.router');
var mapRouter = require('./routes/map.router');
var resultsRouter = require('./routes/results.router');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/earthquakes', earthquakesRouter);
app.use('/map', mapRouter);
app.use('/results', resultsRouter);

module.exports = app;
