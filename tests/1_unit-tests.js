const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('ConvertHandler should correctly read a whole number input.', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });
  test('ConvertHandler should correctly read a decimal number input.', function() {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });
  test('ConvertHandler should correctly read a fractional input.', function() {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });
  test('ConvertHandler should correctly read a fractional input with a decimal.', function() {
    assert.approximately(convertHandler.getNum('2.5/5kg'), 0.5, 0.01);
  });
  test('ConvertHandler should return an error on a double-fraction (i.e. 3/2/3).', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });
  test('ConvertHandler should default to a numerical input of 1 when no numerical input is provided.', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });
  test('ConvertHandler should correctly read each valid input unit.', function() {
    const units = ['gal','l','mi','km','lbs','kg'];
    units.forEach(unit => {
      assert.equal(convertHandler.getUnit('1'+unit), unit === 'l' ? 'L' : unit);
      assert.equal(convertHandler.getUnit('1'+unit.toUpperCase()), unit === 'l' ? 'L' : unit.toUpperCase());
    });
  });
  test('ConvertHandler should return an error for an invalid input unit.', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });
  test('ConvertHandler should return the correct return unit for each valid input unit.', function() {
    const pairs = {gal:'L', L:'gal', mi:'km', km:'mi', lbs:'kg', kg:'lbs'};
    Object.keys(pairs).forEach(unit => {
      assert.equal(convertHandler.getReturnUnit(unit), pairs[unit]);
    });
  });
  test('ConvertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
    const pairs = {gal:'gallons', L:'liters', mi:'miles', km:'kilometers', lbs:'pounds', kg:'kilograms'};
    Object.keys(pairs).forEach(unit => {
      assert.equal(convertHandler.spellOutUnit(unit), pairs[unit]);
    });
  });
  test('ConvertHandler should correctly convert gal to L.', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });
  test('ConvertHandler should correctly convert L to gal.', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });
  test('ConvertHandler should correctly convert mi to km.', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });
  test('ConvertHandler should correctly convert km to mi.', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });
  test('ConvertHandler should correctly convert lbs to kg.', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
  });
  test('ConvertHandler should correctly convert kg to lbs.', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });
});
