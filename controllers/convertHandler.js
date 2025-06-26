function ConvertHandler() {
  const units = {
    gal: { returnUnit: 'L', spell: 'gallons', factor: 3.78541 },
    l:   { returnUnit: 'gal', spell: 'liters', factor: 1 / 3.78541 },
    mi:  { returnUnit: 'km', spell: 'miles', factor: 1.60934 },
    km:  { returnUnit: 'mi', spell: 'kilometers', factor: 1 / 1.60934 },
    lbs: { returnUnit: 'kg', spell: 'pounds', factor: 0.453592 },
    kg:  { returnUnit: 'lbs', spell: 'kilograms', factor: 1 / 0.453592 }
  };

  // Get the number from the input
  this.getNum = function(input) {
    let result;
    let num = input.match(/^[\d.\/]+/);
    if (!num) return 1;
    let strNum = num[0];
    // Double fraction invalid
    if (strNum.split('/').length > 2) return "invalid number";
    try {
      result = eval(strNum);
    } catch (e) {
      return "invalid number";
    }
    return isNaN(result) ? "invalid number" : result;
  };

  // Get the unit from the input
  this.getUnit = function(input) {
    let unit = input.match(/[a-zA-Z]+$/);
    if (!unit) return "invalid unit";
    unit = unit[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    const valid = ['gal','l','L','mi','km','lbs','kg'];
    if (!valid.includes(unit)) return "invalid unit";
    // Return lower case except 'L'
    return unit === 'l' ? 'L' : unit === 'L' ? 'L' : unit.toLowerCase();
  };

  // Get the return unit
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    if (unit === 'l') unit = 'L';
    if (unit === 'L') return 'gal';
    if (units[unit]) return units[unit].returnUnit === 'L' ? 'L' : units[unit].returnUnit.toLowerCase();
    return "invalid unit";
  };

  // Spell out the unit
  this.spellOutUnit = function(unit) {
    let key = unit.toLowerCase();
    if (key === 'l') key = 'l';
    if (key === 'L') key = 'l';
    if (units[key]) return units[key].spell;
    return "invalid unit";
  };

  // Convert the value
  this.convert = function(initNum, initUnit) {
    let key = initUnit.toLowerCase();
    if (key === 'l') key = 'l';
    if (!units[key]) return "invalid unit";
    let factor = units[key].factor;
    return Number((initNum * factor).toFixed(5));
  };

  // Output string
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
