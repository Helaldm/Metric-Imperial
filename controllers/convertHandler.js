function ConvertHandler() {
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
    let num = input.match(/^[\d.\/]+/);
    if (!num) return 1;
    let strNum = num[0];
    if (strNum.split('/').length > 2) return "invalid number";
    try {
      // Permitir fracciones y decimales (ej. 2.5/6)
      let result = eval(strNum);
      // No permitir resultados NaN o infinitos
      return (!isFinite(result) || isNaN(result)) ? "invalid number" : result;
    } catch {
      return "invalid number";
    }
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
    if (!initUnit || typeof initUnit !== 'string') return "invalid unit";
    let unit = initUnit.toLowerCase();
    if (unit === 'l' || unit === 'L') return 'gal';
    if (!units[unit]) return "invalid unit";
    return units[unit].returnUnit;
  };

  this.spellOutUnit = function(unit) {
    let key = unit.toLowerCase();
    if (key === 'l') key = 'l';
    if (units[key]) return units[key].spell;
    return "invalid unit";
  };

  this.normalizeUnit = function(unit) {
    // Siempre devolver 'l' como 'L', lo demás en minúsculas
    if (!unit) return '';
    unit = unit.toLowerCase();
    return unit === 'l' ? 'L' : unit;
  };

  this.convert = function(initNum, initUnit) {
    let key = initUnit.toLowerCase();
    if (!units[key]) return "invalid unit";
    let factor = units[key].factor;
    return Number((initNum * factor).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Deletrear las unidades correctamente y normalizar
    let normInit = this.normalizeUnit(initUnit);
    let normReturn = this.normalizeUnit(returnUnit);
    let initSpell = this.spellOutUnit(normInit);
    let returnSpell = this.spellOutUnit(normReturn);
    return `${initNum} ${initSpell} converts to ${returnNum} ${returnSpell}`;
  };

  this.getConversion = function(input) {
    let num = this.getNum(input);
    let unit = this.getUnit(input);

    // Validaciones combinadas
    let invalidNum = num === "invalid number";
    let invalidUnit = unit === "invalid unit";
    if (invalidNum && invalidUnit) return "invalid number and unit";
    if (invalidNum) return "invalid number";
    if (invalidUnit) return "invalid unit";

    let returnUnit = this.getReturnUnit(unit);
    if (returnUnit === "invalid unit") return "invalid unit";
    let returnNum = this.convert(num, unit);

    // Notar que 'L' se representa en mayúsculas en el returnUnit
    return {
      initNum: num,
      initUnit: this.normalizeUnit(unit),
      returnNum,
      returnUnit: this.normalizeUnit(returnUnit),
      string: this.getString(num, unit, returnNum, returnUnit)
    };
  };
}

module.exports = ConvertHandler;
