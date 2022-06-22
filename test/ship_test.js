const { expect } = require("chai");
const { describe } = require("mocha");

// describe takes 2 args, string describing all the test, and function wraping together
describe('checkForShip', function () {
    const checkForShip = require('../game_logic/ship_methods').checkForShip

    // spec no ship present
    it('should correctly report no ship at a given players coordinate', function () {

        player = {
            ships: [
                {
                    locations: [[0, 0]]
                }
            ]
        };

        expect(checkForShip(player, [9, 9])).to.be.false;
    })

    // spec ship present when it has one location
    it('should correctly report a ship located at a given coordinate', function () {

        player = {
            ships: [
                {
                    locations: [[0, 0]]
                }
            ]
        };

        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    })

    // spec more than one coordinate for one ship
    it('should handle ships located at more than one coordinate', function () {

        player = {
            ships: [
                {
                    locations: [[0, 0], [0, 1]]
                }
            ]
        };

        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
        expect(checkForShip(player, [9, 9])).to.be.false;
    })

    // spec more than one coordinate for one ship
    it('should handle checking multiple ships', function () {

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

    it('should NOT damage a ship at if player guesses wrong coordinate', function () {
        player = {
            ships: [
                {
                    locations: [[0, 0]],
                    damage: []
                }
            ]
        };

        fire(player, [1, 0]);

        expect(player.ships[0].damage).to.be.empty;
        expect(fire(player, [1, 0])).to.equal('missed');
    })
    it('should damage a ship at a given location', function () {
        player = {
            ships: [
                {
                    locations: [[0, 0]],
                    damage: []
                }
            ]
        };

        fire(player, [0, 0]);
        expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
    })

})