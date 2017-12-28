const mongoose = require('mongoose');
const config = require('../config/environment');

mongoose.connect(config.mongo.url);