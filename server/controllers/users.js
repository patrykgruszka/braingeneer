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
exports.profile = function(request, response) {
    const user = request.user || {};
    response.json(user);
};


/**
 * Get users list
 * @param request
 * @param response
 */
exports.list = function(request, response) {
    const query = User.find({}).select('name email username role');

    query.exec(function (error, docs) {
        if (error) {
            response.status(500).send({ message: 'There was a problem with getting users from the database:' + error });
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
exports.create = function(request, response) {
    const user = new User(request.body);

    user.save(function (error, result) {
        if (error) {
            response.status(500).send({ message: 'There was a problem with user the object to the database: ' + error });
        } else {
            response.json({
                message: 'User was successfully added to database',
                result: result
            });
        }
    });
};

/**
 * Logout
 * @param request
 * @param response
 */
exports.logout = function(request, response) {
    request.logout();
    response.json({
        message: 'Success'
    })
};