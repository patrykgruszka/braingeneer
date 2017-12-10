'use strict';
/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = Schema({
    'name': String,
    'description': String,
    'type': String,
    'lang': String,
    'difficulty': {type: Number, min: 1, max: 3},
    'bounty': {type: Number, min: 0},
    'data': Schema.Types.Mixed
});

mongoose.model('Exercise', ExerciseSchema);
