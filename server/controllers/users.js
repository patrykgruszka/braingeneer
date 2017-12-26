'use strict';

/**
 * Module dependencies.
 */
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Score = mongoose.model('Score');
const Log = mongoose.model('Log');
const pauth = passport.authenticate.bind(passport);

/**
 * Get users list
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const query = User.find({}).select('name email role score');

    query.exec(function (error, docs) {
        if (error) {
            response.status(500).send({message: 'There was a problem with getting users from the database:' + error});
        } else {
            response.json(docs);
        }
    });
};

/**
 * Create user
 * @param request
 * @param response
 */
exports.create = function (request, response) {
    const user = new User(request.body);
    const allowedRoles = ['user', 'supervisor'];

    if (allowedRoles.indexOf(user.role) !== -1) {
        user.save(function (error, result) {
            if (error) {
                response.status(400).send({message: error});
            } else {
                response.json({
                    message: 'User was successfully added to database',
                    result: result
                });
            }
        });
    } else {
        response.status(400).send({message: `Role ${user.role} is not allowed`});
    }
};

function handleLoginError(err, code, message, req, res) {
    User.findOne({'email': req.body.email}, '_id', function (userErr, user) {
        const logData = {
            event: 'login',
            status: 'error',
            details: Object.assign({'email': req.body.email}, err)
        };

        if (!userErr && user) {
            logData.user = user._id;
        }

        Log.create(logData);
    });

    return res.status(code).json({message: message});
}

function handleLoginSuccess(user, req, res) {
    Log.create({
        user: user._id,
        event: 'login',
        status: 'success'
    });

    return res.json({
        message: 'Authorization successful'
    });
}

exports.login = function (req, res, next) {
    pauth('local', function (err, user, info) {
        const error = err || info;
        if (error) {
            return handleLoginError(error, 401, 'Invalid email address or password.', req, res);
        }
        if (!user) {
            return handleLoginError({message: 'User not found.'}, 404, 'Something went wrong, please try again.', req, res);
        }

        req.logIn(user, function (err) {
            if (err) {
                return handleLoginError(err, 500, 'Something went wrong, please try again.', req, res);
            }
            return handleLoginSuccess(user, req, res);
        });
    })(req, res, next);
};

/**
 * Logout
 * @param request
 * @param response
 */
exports.logout = function (request, response) {
    const userId = request.user._id;

    request.logout();

    Log.create({
        user: userId,
        event: 'logout',
        status: 'success'
    });

    response.json({
        message: 'Logged out'
    })
};

/**
 * Returns current user if logged
 * @param request
 * @param response
 */
exports.profile = function (request, response) {
    const user = request.user || {};
    response.json(user);
};

/**
 * Create user
 * @param req
 * @param res
 */
exports.updateProfile = function (req, res) {
    const query = {_id: req.user._id};
    const newData = {
        name: req.body.name
    };

    User.findOneAndUpdate(query, newData, {upsert: false}, function (err) {
        if (err) return res.send(500, {error: err});
        return res.json({
            message: 'User profile was successfully updated'
        });
    });
};

/**
 * Get logged user patients list
 * @param req
 * @param res
 */
exports.myPatients = function (req, res) {
    User
        .find({supervisor: req.user._id})
        .exec(function (err, patients) {
            if (err) return res.send(500, {error: err});
            res.json(patients);
        });
};

/**
 * Add new patient
 * @param req
 * @param res
 */
exports.addPatient = function (req, res) {
    const userData = Object.assign({}, req.body, {
        role: 'user',
        supervisor: req.user._id
    });

    const user = new User(userData);
    user.save(function (error, result) {
        if (error) {
            res.status(400).send({message: error});
        } else {
            res.json({
                message: 'Patient was successfully added to database',
                result: result
            });
        }
    });
};