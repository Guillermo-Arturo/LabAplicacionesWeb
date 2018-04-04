var express = require('express');
var router = express.Router();


//http://localhost:3000/
router.get('/', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Corriendo REST API'
      });
});


//////////////////////
// Postgres queries
//////////////////////

var db = require('./queries');

router.get('/api/sepomex/', db.getEstados);
router.get('/api/sepomex/:est', db.getMunicipios);
router.get('/api/sepomex/colonias/', db.getColonias);

module.exports = router;