var express  = require('express');
const cron = require("node-cron");
var crntt = require('./app/controllers/crontabfunc');
//const fs = require("fs");
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');

var bodyParser = require('body-parser');
var cors = require('cors');
var databaseConfig = require('./config/database');
var router = require('./app/routes');




mongoose.connect(databaseConfig.url);

  // schedule tasks to be run on the server
  cron.schedule("59 23 * * *", function() {
    console.log("---------------------");
    crntt.mandaeventos();
    console.log("Running Cron Job");
   /* fs.unlink("./error.log", err => {
      if (err) throw err;
      console.log("Error file succesfully deleted");
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

