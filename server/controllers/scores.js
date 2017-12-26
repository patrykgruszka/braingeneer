'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Score = mongoose.model('Score');

/**
 * Get scores list
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    const query = Score.find({});

    query.exec(function (err, docs) {
        if (err) {
            res.status(500).send({message: 'There was a problem with getting scores from the database:' + err});
        } else {
            res.json(docs);
        }
    });
};