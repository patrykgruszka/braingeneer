'use strict';

/**
 * Application index route
 * @param request
 * @param response
 */
exports.index = function(request, response) {
    response.render('index', {
        title: 'Braingeneer index'
    });
};