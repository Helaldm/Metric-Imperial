const express = require('express');
const convertHandler = require('../controllers/convertHandler');
const router = express.Router();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);
  
  if (initUnit === 'invalid unit') {
    return res.send({ error: 'invalid unit' });
  }
  
  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = initUnit === 'L' ? 'gal' : initUnit === 'gal' ? 'L' : 
                     initUnit === 'kg' ? 'lbs' : 'kg';
  
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
  res.send({ initNum, initUnit, returnNum, returnUnit, string });
});

module.exports = router;
