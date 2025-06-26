function ConvertHandler() {
  // Mapeo de unidades y factores de conversión
  const units = {
    gal: { returnUnit: 'L', spell: 'gallons', factor: 3.78541 },
    l:   { returnUnit: 'gal', spell: 'liters', factor: 1 / 3.78541 },
    mi:  { returnUnit: 'km', spell: 'miles', factor: 1.60934 },
    km:  { returnUnit: 'mi', spell: 'kilometers', factor: 1 / 1.60934 },
    lbs: { returnUnit: 'kg', spell: 'pounds', factor: 0.453592 },
    kg:  { returnUnit: 'lbs', spell: 'kilograms', factor: 1 / 0.453592 }
  };
  const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

  this.getNum = function(input) {
    let result;
    let num = input.match(/^[\d.\/]+/);
    if (!num) return 1;
    let strNum = num[0];
    if (strNum.split('/').length > 2) return "invalid number";
    try {
      result = eval(strNum);
    } catch (e) {
      return "invalid number";
    }
    return isNaN(result) ? "invalid number" : result;
  };

  this.getUnit = function(input) {
    let unit = input.match(/[a-zA-Z]+$/);
    if (!unit) return "invalid unit";
    unit = unit[0].toLowerCase();
    if (unit === 'l') return 'L';
    if (validUnits.includes(unit)) return unit;
    return "invalid unit";
  };

  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    if (unit === 'l') unit = 'l';
    if (!units[unit]) return "invalid unit";
    return units[unit].returnUnit;
  };

  this.spellOutUnit = function(unit) {
    let key = unit.toLowerCase();
    if (key === 'l') key = 'l';
    if (units[key]) return units[key].spell;
    return "invalid unit";
  };

  this.convert = function(initNum, initUnit) {
    let key = initUnit.toLowerCase();
    if (!units[key]) return "invalid unit";
    let factor = units[key].factor;
    return Number((initNum * factor).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
