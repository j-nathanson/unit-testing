const expect = require('chai').expect;

// fail case, assertation error, expects true to be false
// expect(true).to.be.false;

// expect(true).to.be.true;

function titleCase(title) {
    const words = title.split(' ');
    const titleCaseWords = words.map(word => word[0].toUpperCase() + word.substring(1));
    return titleCaseWords.join(' ');
}

expect(titleCase('the great mouse detective')).to.be.a('string');
expect(titleCase('a')).to.equal('A');
expect(titleCase('vertigo')).to.equal('Vertigo');

// more complex test
expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective')