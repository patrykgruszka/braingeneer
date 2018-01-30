const expect = require('chai').expect;
const assert = require('chai').assert;
require('../../models/user');
const mongoose = require('mongoose');
const User = mongoose.model('User');


describe('User', function() {
    it('should always have name property', function(done) {
        const user = new User();
        user.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should always have email property', function(done) {
        const user = new User();
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should always have valid email property', function(done) {
        const user = new User({'email': 'notEmailAddress'});
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});

describe('User saltMethod', function() {
    const user = new User();

    it('should return not empty string', function(done) {
        const salt = user.makeSalt();
        expect(salt).to.be.a('string');
        assert.isNotEmpty(salt);
        done();
    });

    it('should not return same string twice', function(done) {
        const salt1 = user.makeSalt();
        const salt2 = user.makeSalt();
        expect(salt1).not.equal(salt2);
        done();
    });
});