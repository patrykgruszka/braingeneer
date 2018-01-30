const expect = require('chai').expect;
require('../../models/score');
const mongoose = require('mongoose');
const Score = mongoose.model('Score');


describe('Score', function() {
    it('should always have score prop equal or greater than 0', function(done) {
        const score = new Score({score: -5});
        score.validate(function(err) {
            expect(err.errors.score).to.exist;
            done();
        });
    });

    it('should always have date prop', function(done) {
        const score = new Score();
        expect(score.date).to.exist;
        done();
    });
});