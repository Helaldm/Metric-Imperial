'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');

const app = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apiRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});

module.exports = app; // para pruebas
