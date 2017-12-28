const config = require('../config/environment');
const dictionary = require('./' + config.lang);

/**
 * Simple templating function
 * e.g. template('More than {0}, less than {1}', [5, 10])
 * should return 'More than 5, less than 10'
 * @param {String} source
 * @param {Array} params
 * @returns {String}
 */
const template = function(source, params) {
    if (params === undefined) {
        return source;
    }

    for (let i = 0; i < params.length; i++) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), params[i]);
    }
    return source;
};

/**
 * Main translate method
 * @param {String} source
 * @param {Array} [params=[]] params
 * @returns {String}
 */
const translate = function(source, params) {
    const translated = dictionary[source] || source;
    return template(translated, params);
};

module.exports = translate;