'use strict';

/**
 * Module dependencies
 */
const application = require('../controllers/app');
const users = require('../controllers/users');
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

    // authentication
    app.post('/api/login', function(req, res, next) {
        pauth('local', function(err, user, info) {
            const error = err || info;
            if(error) {
                return res.status(401).json(error);
            }
            if(!user) {
                return res.status(404).json({message: 'Something went wrong, please try again.'});
            }

            req.logIn(user, function(err) {
                if (err) {
                    return res.status(500).json({message: 'Something went wrong, please try again.'});
                }
                return res.json({
                    message: 'Authorization successful',
                    detail: info
                });
            });
        })(req, res, next);
    });
    app.get('/api/profile', users.profile);
    app.patch('/api/profile', users.updateProfile);
    app.get('/api/logout', users.logout);

    // users api
    app.get('/api/users', auth.requiresLogin, auth.hasAdminRole, users.list);

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