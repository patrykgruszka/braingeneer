'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Score = mongoose.model('Score');

/**
 * Get scores list
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const query = Score.find({});

    query.exec(function (error, docs) {
        if (error) {
            response.status(500).send({message: 'There was a problem with getting scores from the database:' + error});
        } else {
            response.json(docs);
        }
    });
};