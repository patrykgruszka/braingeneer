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
    const criteria = {};

    if (req.params.user) {
        criteria.user = req.params.user;
    }

    Score.find(criteria)
        .populate('exercise', 'name type difficulty bounty')
        .exec(function (err, docs) {
        if (err) {
            res.status(500).send({message: 'There was a problem with getting scores from the database:' + err});
        } else {
            res.json(docs);
        }
    });
};