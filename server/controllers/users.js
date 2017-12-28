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
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    const query = User.find({}).select('name email role score');

    query.exec(function (err, docs) {
        if (err) {
            res.status(500).send({message: 'There was a problem with getting users from the database:' + err});
        } else {
            res.json(docs);
        }
    });
};

/**
 * Get user by identifier
 * @param req
 * @param res
 */
exports.getById = function (req, res) {
    const user = req.params.user || false;

    if (user !== false) {
        const query = User.findOne({ _id: user }).select('name email role score');
        query.exec(function (err, docs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(docs);
            }
        })
    } else {
        res.status(400).send({message: 'Param user not provided'});
    }
};

/**
 * Create new user
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    const user = new User(req.body);
    const allowedRoles = ['user', 'supervisor'];

    if (allowedRoles.indexOf(user.role) !== -1) {
        user.save(function (err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json({
                    message: 'User was successfully added to database'
                });
            }
        });
    } else {
        res.status(400).send({message: `Role ${user.role} is not allowed`});
    }
};

/**
 * Handles login error
 * @param err
 * @param code
 * @param message
 * @param req
 * @param res
 * @returns {*}
 */
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

/**
 * Handles login success
 * @param user
 * @param req
 * @param res
 * @returns {*}
 */
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

/**
 * User login action
 * @param req
 * @param res
 * @param next
 */
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
 * User logout action
 * @param req
 * @param res
 */
exports.logout = function (req, res) {
    const userId = req.user._id;

    req.logout();

    Log.create({
        user: userId,
        event: 'logout',
        status: 'success'
    });

    res.json({
        message: 'Logged out'
    })
};

/**
 * Returns current user info if logged
 * @param request
 * @param response
 */
exports.profile = function (request, response) {
    const user = request.user || {};
    response.json(user);
};

/**
 * Updates user profile
 * @param req
 * @param res
 */
exports.updateProfile = function (req, res) {
    const query = {_id: req.user._id};
    const newData = {
        name: req.body.name
    };

    User.findOneAndUpdate(query, newData, {upsert: false}, function (err) {
        if (err) return res.send(500, {err});
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
        .select('name email score')
        .exec(function (err, patients) {
            if (err) return res.send(500, {err});
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
    user.save(function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json({
                message: 'Patient was successfully added to database'
            });
        }
    });
};