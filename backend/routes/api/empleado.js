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

//Metodo Get 

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
}); //Fin del metodo Get



module.exports = router;