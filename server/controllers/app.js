'use strict';
const __ = require('../i18n/translate');

/**
 * Application index route
 * @param request
 * @param response
 */
exports.index = function(request, response) {
    response.render('index', {
        title: __('Braingeneer - rehabilitation after stroke')
    });
};