var express = require('express');
var router = express.Router();

var empleadoApi = require('./api/empleado');

router.use('/empleado', empleadoApi);

module.exports = router;
