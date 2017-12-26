'use strict';
/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = Schema({
    exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    score: {type: Number, default: 0, min: 0},
    details: Schema.Types.Mixed,
    date: {type: Date, default: Date.now}
});

mongoose.model('Score', ScoreSchema);