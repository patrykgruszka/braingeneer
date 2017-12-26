'use strict';
/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    event: String,
    status: String,
    date: {type: Date, default: Date.now},
    details: Schema.Types.Mixed
});

mongoose.model('Log', LogSchema);