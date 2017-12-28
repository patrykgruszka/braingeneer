const config = {
    env: process.env.NODE_ENV || 'development',

    userRoles: ['user', 'supervisor', 'admin'],

    // Server port
    port: 3000,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'braingeneer-secret'
    },

    lang: 'pl'
};

module.exports = Object.assign({}, config, require(`./${config.env}.js`) || {});
