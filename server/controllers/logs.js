'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Log = mongoose.model('Log');

/**
 * Get logs list
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    const criteria = {};

    if (req.params.user) {
        criteria.user = req.params.user;
    }

    Log.find(criteria).exec(function (err, docs) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(docs);
        }
    });
};