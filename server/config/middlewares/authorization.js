'use strict';
const config = require('../environment');

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

exports.hasAdminRole = function (req, res, next) {
    if (meetsRequirements(req.user.role, 'admin')) return next();

    res.status(403).json({
        'message': 'Forbidden'
    })
};

exports.hasSupervisorRole = function (req, res, next) {
    if (meetsRequirements(req.user.role, 'supervisor')) return next();

    res.status(403).json({
        'message': 'Forbidden'
    })
};