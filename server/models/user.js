'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const __ = require('../i18n/translate');

/**
 * User Schema
 */

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String},
    role: {type: String, default: 'user'},
    supervisor: {type: Schema.Types.ObjectId, ref: 'User'},
    score: {type: Number, default: 0, min: 0},
    // sensitive data
    hashed_password: {type: String, default: ''},
    salt: {type: String, default: ''},
    authToken: {type: String, default: ''}
});

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

/**
 * Validations
 */
const emailValidationRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
UserSchema.path('email').validate(function (email) {
    return email.length;
}, __('Email cannot be blank'));

UserSchema.path('email').validate(function (email) {
    return emailValidationRegEx.test(email.toLowerCase());
}, __('Email address must be valid'));

UserSchema.path('email').validate(function (email, fn) {
    const User = mongoose.model('User');

    // check email only if it's a new user or email field is modified
    if (this.isNew || this.isModified('email')) {
        User.find({email: email}).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, __('Email already exists'));

UserSchema.path('hashed_password').validate(function (hashed_password) {
    return hashed_password.length && this._password.length;
}, __('Password cannot be blank'));


const validatePresenceOf = value => value && value.length;

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

/**
 * Methods
 */
UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     * @param {String} password
     * @return {Boolean} true if passwords match
     */
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashed_password;
    },

    /**
     * Make salt
     * @return {String} generated salt
     */
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     * @param {String} password unencrypted
     * @return {String} password encrypted
     */
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

/**
 * Statics
 */
UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @returns {Promise}
     * @api private
     */
    load: function (options, cb) {
        options.select = options.select || 'email name role score';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
};

mongoose.model('User', UserSchema);