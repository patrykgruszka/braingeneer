'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Log = mongoose.model('Log');

/**
 * Get logs list
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const query = Log.find({});

    query.exec(function (error, docs) {
        if (error) {
            response.status(500).send({message: 'There was a problem with getting logs from the database:' + error});
        } else {
            response.json(docs);
        }
    });
};