'use strict';

const fs = require('fs');
const express = require('express');
const path = require('path');
const passport = require('passport');

const app = express();

// Bootstrap models
const models = path.join(__dirname, './models');
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(path.join(models, file)));

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport, express);

module.exports = app;
