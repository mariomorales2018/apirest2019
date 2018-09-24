var express  = require('express');
const cron = require("node-cron");
var crntt = require('./app/controllers/crontabfunc');
//const fs = require("fs");
var app      = express();
var mongoose = require('mongoose');
//var mongoose2 = require('mongoose');
//var mongoose =require("./app/mongodb1.js");
var logger = require('morgan');

var bodyParser = require('body-parser');
var cors = require('cors');
var databaseConfig = require('./config/database');
var router = require('./app/routes');




mongoose.connect(databaseConfig.url);
//mongoose2.connect(databaseConfig.url2);

  // schedule tasks to be run on the server
  cron.schedule("59 23 * * *", function() {
   
    crntt.mandaeventos();
  
   /* fs.unlink("./error.log", err => {
      if (err) throw err;
   
    });
    */
  });

 
app.listen(process.env.PORT || 9090);
console.log("App listening on port 9090");
//app.use(express.favicon());
//app.use(express.logger('dev'));

//app.use(express.methodOverride());

app.use(bodyParser.urlencoded({limit: '10mb', extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json({limit: '50mb'})); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
 
router(app);
/*
var soap = require('soap');
var url = 'http://registro.usac.edu.gt/WS/consultaEstudianteRyEv2.0.php?wsdl';
var args = {DEPENDENCIA: 'rectoria',LOGIN: '980071',  
PWD: 'fsdg32as',CARNET:'201408417',CICLO_ACTIVO:'2018'};

var wsdlOptions = {
  xmlKey: '<SOLICITUD_DATOS_RYE><DEPENDENCIA>rectoria</DEPENDENCIA><LOGIN>980071</LOGIN><PWD>fsdg32as</PWD><CARNET>201408417</CARNET><CICLO_ACTIVO>2018</CICLO_ACTIVO></SOLICITUD_DATOS_RYE>'
};

soap.createClient(__dirname + '/wsdl/default_namespace.wsdl', wsdlOptions, function (err, client) {
  // your code
  console.log(client);
  client.DATOSGENERALES(args, function(err, result) {
    console.log(result);
});
});


soap.createClient(url, function(err, client) {
  client.datosGenerales(args, function(err, result) {
      console.log(result);
  });
});
*/

