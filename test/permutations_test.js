const { expect } = require("chai");
const { describe } = require("mocha");

describe('getPermutations', function () {

    it('should return an empty array if inputted array was an empty array', function () {
        const getPermutations = require('../game_logic/permutations').getPermutations;

        expect(getPermutations([])).to.deep.equal([]);
    })
})