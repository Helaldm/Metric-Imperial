'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');
const handler = new ConvertHandler();

module.exports = function(app) {
  app.route('/api/convert')
    .get(function(req, res) {
      const input = req.query.input;
      const num = handler.getNum(input || "");
      const unit = handler.getUnit(input || "");
      if (num === "invalid number" && unit === "invalid unit") {
        return res.json("invalid number and unit");
      }
      if (num === "invalid number") {
        return res.json("invalid number");
      }
      if (unit === "invalid unit") {
        return res.json("invalid unit");
      }

      const returnNum = handler.convert(num, unit);
      const returnUnit = handler.getReturnUnit(unit);

      const result = {
        initNum: num,
        initUnit: unit,
        returnNum,
        returnUnit,
        string: handler.getString(num, unit, returnNum, returnUnit)
      };
      res.json(result);
    });
};
