const convertHandler = require('../controllers/convertHandler');
const { assert } = require('chai');

describe('Unit Tests', function() {
  it('should read a whole number input', function() {
    assert.equal(convertHandler.getNum('5kg'), 5);
  });
  it('should read a decimal input', function() {
    assert.equal(convertHandler.getNum('5.5kg'), 5.5);
  });
  it('should read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2kg'), 0.5);
  });
  it('should read a fractional input with decimal', function() {
    assert.equal(convertHandler.getNum('5.2/2kg'), 2.6);
  });
  it('should return "invalid unit" for an invalid unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });
  // Agrega más pruebas según sea necesario...
});
