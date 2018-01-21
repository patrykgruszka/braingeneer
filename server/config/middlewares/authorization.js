'use strict';
const config = require('../environment');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * Checks if role meets requirements
 * @param role to check
 * @param roleRequired
 * @returns {boolean}
 */
function meetsRequirements(role, roleRequired) {
    return config.userRoles.indexOf(role) >= config.userRoles.indexOf(roleRequired);
}

/**
 * Generic require login routing middleware
 * @param req
 * @param res
 * @param next
 */
exports.requiresLogin = function (req, res, next) {
    if (req.isAuthenticated()) return next();

    res.status(401).json({
        'message': 'Authorization required'
    });
};

/**
 * Require admin role middleware
 * @param req
 * @param res
 * @param next
 */
exports.hasAdminRole = function (req, res, next) {
    if (meetsRequirements(req.user.role, 'admin')) return next();

    res.status(403).json({
        'message': 'Forbidden'
    });
};

/**
 * Require supervisor role middleware
 * @param req
 * @param res
 * @param next
 */
exports.hasSupervisorRole = function (req, res, next) {
    if (meetsRequirements(req.user.role, 'supervisor')) return next();

    res.status(403).json({
        'message': 'Forbidden'
    });
};

/**
 * Check if logged user has access to requested user data
 * @param req
 * @param res
 * @param next
 */
exports.hasAccessToUser = function(req, res, next) {
    const toUser = req.params.user || false;

    if (!toUser) return res.status(400).json({'message': 'No user parameter provided'});
    if (meetsRequirements(req.user.role, 'admin')) return next();
    if (req.user._id.equals(toUser)) return next();

    User.findOne({_id: toUser}, function(err, user) {
        if (err) return res.status(500).send({message: err});

        if (req.user._id.equals(user.supervisor)) {
            next();
        } else {
            res.status(403).json({
                'message': 'Forbidden'
            });
        }
    });
};