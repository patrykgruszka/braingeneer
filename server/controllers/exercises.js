'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');

/**
 * Get exercises list
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const query = Exercise.find({}).select('name type description difficulty bounty');

    query.exec(function (error, docs) {
        if (error) {
            response.status(500).send({message: 'There was a problem with getting exercises from the database:' + error});
        } else {
            response.json(docs);
        }
    });
};

exports.getById = function (req, res) {
    const exerciseId = req.params.exerciseId || false;

    if (exerciseId !== false) {
        const query = Exercise.findOne({ _id: exerciseId });
        query.exec(function (err, docs) {
            if (err) {
                res.status(500).send({message: 'There was a problem with getting exercise from the database:' + err});
            } else {
                res.json(docs);
            }
        })
    } else {
        res.status(400).send({message: 'Param exerciseId not provided'});
    }
};