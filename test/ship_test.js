const { expect } = require("chai");
const { describe, afterEach } = require("mocha");

// describe takes 2 args, string describing all the test, and function wraping together
describe('checkForShip', function () {
    const checkForShip = require('../game_logic/ship_methods').checkForShip;

    let player;

    // The same player object is used for all the tests, runs once before the first test in this block
    before(function () {
        player = {
            ships: [
                {
                    locations: [[0, 0], [0, 1]]
                },
                {
                    locations: [[1, 0], [1, 1]]
                },
                {
                    locations: [[2, 0], [2, 1], [2, 2], [2, 3]]
                },
            ]
        };
    })

    // spec no ship present
    it('should correctly report no ship at a given players coordinate', function () {

        expect(checkForShip(player, [9, 9])).to.be.false;
    })

    // spec ship present when it has one location
    it('should correctly report a ship located at a given coordinate', function () {

        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    })

    // spec more than one coordinate for one ship
    it('should handle ships located at more than one coordinate', function () {


        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [9, 9])).to.be.false;
    })

    // spec more than one coordinate for one ship
    it('should handle checking multiple ships', function () {

        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);
        expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);
        expect(checkForShip(player, [9, 9])).to.be.false;
    })
})

describe('damageShip', function () {
    const damageShip = require('../game_logic/ship_methods').damageShip;


    // const a = { "a": "a" };
    // const b = { "a": "a" };
    // expect(a).to.equal(b); // false, as a refers to a different object than b
    // expect(a).to.deep.equal(b); // true, as the value of every property of a and b equals

    it('should register damage on a given ship at a given location', function () {
        const ship = {
            location: [[0, 0]],
            damage: []
        };

        damageShip(ship, [0, 0]);

        expect(ship.damage).to.not.be.empty;
        expect(ship.damage[0]).to.deep.equal([0, 0]);
    })
})

describe('fire', function () {
    const fire = require('../game_logic/ship_methods').fire;
    let player;

    // the player object is re-written after each test,  runs before each test in this block
    beforeEach(function () {
        player = {
            ships: [
                {
                    locations: [[0, 0]],
                    damage: []
                }
            ]
        };
    })

    // executed at the end of the suite
    after(function () {
        console.log('entire test suite completed');
    })
    // executed at the end of each test
    afterEach(function () {
        console.log('one unit test completed');
    })

    it('should NOT damage a ship at if player guesses wrong coordinate', function () {
        fire(player, [1, 0]);
        expect(player.ships[0].damage).to.be.empty;
        expect(fire(player, [1, 0])).to.equal('missed');
    })
    it('should damage a ship at a given location', function () {
        fire(player, [0, 0]);
        expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
    })

})