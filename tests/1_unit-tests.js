const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Testing reading a whole number input.", () => {
    assert.strictEqual(
      convertHandler.getNum("2mi"),
      2,
      "convertHandler should correctly read a whole number input.",
    );
  });

  test("Testing reading a decimal number input.", () => {
    assert.strictEqual(
      convertHandler.getNum("3.1kg"),
      3.1,
      "convertHandler should correctly read a decimal number input.",
    );
  });

  test("Testing reading a fractional input.", () => {
    assert.strictEqual(
      convertHandler.getNum("3/5l"),
      0.6,
      "convertHandler should correctly read a fractional input.",
    );
  });

  test("Testing reading a fractional input with a decimal.", () => {
    assert.strictEqual(
      convertHandler.getNum("1.8/2lbs"),
      0.9,
      "convertHandler should correctly read a fractional input with a decimal.",
    );
  });

  test("Testing returning an error on a double-fraction", () => {
    assert.strictEqual(
      convertHandler.getNum("3/5/7kg"),
      "invalid number",
      "convertHandler should correctly return an error on a double-fraction",
    );
  });

  test("Testing defaulting to a numerical input of 1 when no numerical input is provided.", () => {
    assert.strictEqual(
      convertHandler.getNum("mi"),
      1,
      "convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.",
    );
  });
  test("Testing correctly reading each valid input unit.", () => {
    assert.strictEqual(convertHandler.getUnit("3kg"), "kg", "correctly get kg");
    assert.strictEqual(convertHandler.getUnit("3mi"), "mi", "correctly get mi");
    assert.strictEqual(
      convertHandler.getUnit("3lbs"),
      "lbs",
      "correctly get lbs",
    );
    assert.strictEqual(
      convertHandler.getUnit("3gal"),
      "gal",
      "correctly get gal",
    );
    assert.strictEqual(convertHandler.getUnit("3km"), "km", "correctly get km");
    assert.strictEqual(convertHandler.getUnit("3L"), "L", "correctly get L");
  });
  test("Testing correctly returning an error for an invalid input unit.", () => {
    assert.strictEqual(
      convertHandler.getUnit("3bug"),
      "invalid unit",
      "convertHandler should correctly return an error for an invalid input unit.",
    );
  });
  test("Testing returning the correct return unit for each valid input unit.", () => {
    assert.strictEqual(
      convertHandler.getReturnUnit("kg"),
      "lbs",
      "kg should return lbs",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("lbs"),
      "kg",
      "lbs should return kg",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("km"),
      "mi",
      "km should return mi",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("mi"),
      "km",
      "mi should return km",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("L"),
      "gal",
      "L should return gal",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("gal"),
      "L",
      "gal should return L",
    );
  });
  test("Testing correctly returning the spelled-out string unit for each valid input unit.", () => {
    assert.strictEqual(
      convertHandler.spellOutUnit("KG"),
      "kg",
      "KG should return kg",
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("l"),
      "L",
      "l should return L",
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("MI"),
      "mi",
      "MI should return mi",
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("LBS"),
      "lbs",
      "LBS should return lbs",
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("GAL"),
      "gal",
      "GAL should return gal",
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("KM"),
      "km",
      "KM should return km",
    );
  });
  test("Testing correctly converting gal to L.", () => {
    assert.strictEqual(
      convertHandler.convert(2, "gal"),
      7.57082,
      "convert 2gal to 7.57082L",
    );
  });
  test("Testing correctly converting L to gal.", () => {
    assert.strictEqual(
      convertHandler.convert(2, "L"),
      0.52834,
      "convert 2L to 0.52834l",
    );
  });
  test("Testing correctly converting mi to km.", () => {
    assert.strictEqual(
      convertHandler.convert(2, "mi"),
      3.21868,
      "convert 2mi to 3.21868m",
    );
  });
  test("Testing correctly converting km to mi.", () => {
    assert.strictEqual(
      convertHandler.convert(2, "km"),
      1.24275,
      "convert 2km to 1.24274i",
    );
  });
  test("Testing correctly converting lbs to kg.", () => {
    assert.strictEqual(
      convertHandler.convert(2, "lbs"),
      0.90718,
      "convert 2lbs to 0.90718g",
    );
  });
  test("Testing correctly converting kg to lbs.", () => {
    assert.strictEqual(
      convertHandler.convert(2, "kg"),
      4.40925,
      "convert 2kg to 4.40924s",
    );
  });
});
