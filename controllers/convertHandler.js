function ConvertHandler() {
  const unitMap = {
    gal: { returnUnit: "L", spell: "gallons", factor: 3.78541 },
    l:   { returnUnit: "gal", spell: "liters", factor: 1 / 3.78541 },
    mi:  { returnUnit: "km", spell: "miles", factor: 1.60934 },
    km:  { returnUnit: "mi", spell: "kilometers", factor: 1 / 1.60934 },
    lbs: { returnUnit: "kg", spell: "pounds", factor: 0.453592 },
    kg:  { returnUnit: "lbs", spell: "kilograms", factor: 1 / 0.453592 }
  };

  this.getNum = function(input) {
    let result;
    let num = input.match(/^[\d/.]+/);
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
    if (unit === "l") unit = "L";
    if (!["gal","l","L","mi","km","lbs","kg"].includes(unit.toLowerCase())) return "invalid unit";
    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase();
    if (initUnit === "l") initUnit = "L";
    let key = initUnit === "L" ? "l" : initUnit;
    return unitMap[key] ? unitMap[key].returnUnit : "invalid unit";
  };

  this.spellOutUnit = function(unit) {
    unit = unit.toLowerCase();
    if (unit === "l") unit = "L";
    let key = unit === "L" ? "l" : unit;
    return unitMap[key] ? unitMap[key].spell : "invalid unit";
  };

  this.convert = function(initNum, initUnit) {
    let key = initUnit.toLowerCase() === "l" ? "l" : initUnit.toLowerCase();
    if (!unitMap[key]) return "invalid unit";
    let factor = unitMap[key].factor;
    return +(initNum * factor).toFixed(5);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
