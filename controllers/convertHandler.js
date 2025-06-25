const convertHandler = {
  getNum: function(input) {
    const result = input.match(/(\d+\.?\d*\/\d+\.?\d*|\d+\.?\d*|\d+)/);
    if (result) return eval(result[0]);
    return 1; // Valor predeterminado
  },
  getUnit: function(input) {
    const result = input.match(/[a-zA-Z]+/);
    const unit = result ? result[0].toLowerCase() : '';
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit;
    }
    return 'invalid unit';
  },
  convert: function(num, unit) {
    const conversions = {
      gal: num * 3.78541,
      l: num / 3.78541,
      mi: num * 1.60934,
      km: num / 1.60934,
      lbs: num * 0.453592,
      kg: num / 0.453592,
    };
    return conversions[unit];
  },
  getString: function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  }
};

module.exports = convertHandler;
