var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://memo:12345@localhost:5432/shopcar';
var db = pgp(connectionString);

/////////////////////
// Query Functions
/////////////////////

function getEstados(req, res, next) {
    db.any('SELECT DISTINCT estado FROM sepomex')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo la informacion de los estados'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

function getMunicipios(req, res, next) {
    var nombre_estado = req.params.est;
    console.log("Se recibio el nombre del estado: " + nombre_estado);
    
    db.any('SELECT DISTINCT municipio FROM sepomex WHERE estado LIKE \'%$1#%\'', nombre_estado)
        .then(function (data) {
            res.status(200)
            .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo la informacion de los municipios'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

function getColonias(req, res, next) {
    var nombre_municipio = req.params.municipio;
    var nombre_estado = req.params.estado;

    console.log("Se recibio el nombre del municipio: " + nombre_municipio);
    console.log("Se recibio el nombre del estado: " + nombre_estado);

    db.any('SELECT asentamiento FROM sepomex WHERE municipio LIKE \'%$1#%\' AND estado LIKE \'%$2#%\'', [nombre_municipio, nombre_estado])
        .then(function (data) {
            res.status(200)
            .json({
            status: 'success',
            data: data,
            message: 'Se obtuvo la informacion de las colonias'
        });
    })
    .catch(function (err) {
        return next(err);
    });
}

/////////////
// Exports
/////////////

module.exports = {
    getEstados: getEstados,
    getMunicipios: getMunicipios,
    getColonias: getColonias
};