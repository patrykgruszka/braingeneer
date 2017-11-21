'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const User = mongoose.model('User');

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
 * Login
 * @param request
 * @param response
 */
exports.login = function(request, response) {
    response.render('login', {
        title: 'Login - Google Maps Generator',
        errors: request.flash('error'),
        info: request.flash('info'),
        success: request.flash('success')
    });
};

/**
 * Register
 * @param request
 * @param response
 */
exports.signup = function(request, response) {
    response.render('signup', {
        title: 'New user registration - Google Maps Generator',
        errors: request.flash('errors')
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