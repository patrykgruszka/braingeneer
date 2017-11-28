'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');


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
    const query = {'email': req.user.email};
    const newData = {
        name: req.body.name
    };

    User.findOneAndUpdate(query, newData, {upsert: false}, function (err, user) {
        if (err) return res.send(500, {error: err});
        return res.json({
            message: 'User profile was successfully updated'
        });
    });
};

/**
 * Get users list
 * @param request
 * @param response
 */
exports.list = function (request, response) {
    const query = User.find({}).select('name email username role');

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

/**
 * Logout
 * @param request
 * @param response
 */
exports.logout = function (request, response) {
    request.logout();
    response.json({
        message: 'Logged out'
    })
};