var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();


var fileModel = require('./jsonmodel');
var data = null;

var empleadoData = {
    'RTN':'',
    'empresa': '',
    'correo': '',
    'rubro': '',
    'direccion': '',
    'telefono': '',
};

//Metodo GET

router.get('/', function(req, res, next){
    if(!data){
        fileModel.read(function(err, filedata){
            if(err){
                console.log(err);
                data=[];
                return res.status(500).json({'error':'Error al obtner los datos'});
            }
            data = JSON.parse(filedata);
            return res.status(200).json(data);
        });
    } else {
        return res.status(200).json(data);
    }
}); //Fin del metodo GET

//Creación del metodo POST
router.post('/new', function(req, res, next){
    var _empleadoData = Object.assign({}, empleadoData, req.body);
    if(!data){
        data = [];
    }
    data.push(_empleadoData);
    fileModel.write(data, function(err){
    if(err){
        console.log(err);
        return res.status(500).json({'error': 'Error al obtener los datos'});
    }
    return res.status(200).json(_empleadoData);
    });
});//Fin metodo POST

//Creación metodo PUT
router.put('/done/:rtn', function(req, res, next){
    var _empleadoRtn = req.params.RTN;
    var _empleadoUpdate = req.body;
    var _empleadoUpdated = null;
    var nuevo = data.map(
        function(doc, i){
            if(doc.rtn == _empleadoRtn){
                _empleadoUpdated = Object.assign(
                    {},
                    doc,
                    {"done":true},
                    _empleadoUpdate
                );
                return _empleadoUpdated;
            }
            return doc;
        }
    );
    data = nuevo;
    fileModel.write(data, function (err){
        if(err){
            console.log(err);
            return res.status(500).json({'error': 'Error al Guardar los datos'});
        }
        return res.status(200).json(_empleadoUpdated);
    });
});//Fin metodo PUT




module.exports = router;