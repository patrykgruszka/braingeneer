'use strict';

/**
 * Module dependencies
 */
const application = require('../controllers/app');
const users = require('../controllers/users');
const logs = require('../controllers/logs');
const scores = require('../controllers/scores');
const exercises = require('../controllers/exercises');
const auth = require('./middlewares/authorization');

/**
 * Expose routes
 * @param app
 * @param passport
 * @param express
 */
module.exports = function(app, passport, express) {
    const pauth = passport.authenticate.bind(passport);

    app.get('/', application.index);
    app.get('/login', application.index);
    app.get('/logout', application.index);
    app.get('/register', application.index);
    app.get('/profile', application.index);
    app.get('/patients*', application.index);
    app.get('/users*', application.index);
    app.get('/exercise*', application.index);

    // authentication
    app.post('/api/login', users.login);
    app.get('/api/logout', users.logout);

    // my
    app.get('/api/my/profile', users.profile);
    app.get('/api/my/patients', users.myPatients);
    app.patch('/api/my/profile', users.updateProfile);
    app.post('/api/my/patients', auth.hasSupervisorRole, users.addPatient);

    // users api
    app.get('/api/users', auth.requiresLogin, auth.hasAdminRole, users.list);
    app.post('/api/users', users.create);
    app.get('/api/users/:user', auth.requiresLogin, auth.hasAccessToUser, users.getById);
    app.get('/api/users/:user/scores', auth.requiresLogin, auth.hasAccessToUser, scores.list);
    app.get('/api/users/:user/logs', auth.requiresLogin, auth.hasAccessToUser, logs.list);

    // scores api
    app.get('/api/scores', auth.requiresLogin, auth.hasAdminRole, scores.list);

    // logs api
    app.get('/api/logs', auth.requiresLogin, auth.hasAdminRole, logs.list);

    // exercises api
    app.get('/api/exercises', exercises.list);
    app.get('/api/exercises/:exerciseId', exercises.getById);
    app.get('/api/exercises/:exerciseId/start', exercises.start);
    app.post('/api/exercises/:exerciseId/complete', exercises.complete);

    app.use(express.static('client/public'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};