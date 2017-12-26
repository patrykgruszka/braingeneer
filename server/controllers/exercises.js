'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');
const Score = mongoose.model('Score');

/**
 * Get exercises list
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const query = Exercise.find({}).select('name type description difficulty bounty stats');

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

/**
 * Start exercise
 * @param req
 * @param res
 */
exports.start = function (req, res) {
    const exerciseId = req.params.exerciseId || false;

    if (exerciseId !== false) {
        const query = Exercise.findOneAndUpdate({ _id: exerciseId }, { $inc: { 'stats.started': 1 }});

        query.exec(function (err, docs) {
            if (err) {
                res.status(500).send({message: 'There was a problem with updating exercise:' + err});
            } else {
                res.json(docs);
            }
        });


    } else {
        res.status(400).send({message: 'Param exerciseId not provided'});
    }
};

/**
 * Complete exercise and store result
 * @param req
 * @param res
 */
exports.complete = function (req, res) {
    const user = req.user || false;
    const exerciseId = req.params.exerciseId || false;
    const details = req.body.details;
    const score = req.body.score;

    console.log(req.body);

    const scoreData = {
        _exerciseId: exerciseId,
        details: details,
        score: score
    };

    if (user) {
        scoreData._userId = user._id;
    }

    Exercise.findOneAndUpdate({ _id: exerciseId }, { $inc: { 'stats.completed': 1 }},  function() {
        Score.create(scoreData, function (err, score) {
            if (err) {
                res.status(500).send({message: err});
            } else {
                res.send({
                    score: score,
                    message: 'Congratulations!'
                });
            }
        });
    });

};