const expect = require('chai').expect;
require('../../models/exercise');
const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');


describe('Exercise', function() {
    it('difficulty should be equal or greater than 1', function(done) {
        const exercise = new Exercise({difficulty: 0});
        exercise.validate(function(err) {
            expect(err.errors.difficulty).to.exist;
            done();
        });
    });
    it('difficulty should not be greater than 3', function(done) {
        const exercise = new Exercise({difficulty: 4});
        exercise.validate(function(err) {
            expect(err.errors.difficulty).to.exist;
            done();
        });
    });
});