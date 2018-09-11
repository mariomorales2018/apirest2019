var oracledb = require('oracledb');
var Bitacora = require('../models/bitacora');

/*
var connAttrs = {
    "user": "sun",
    "password": "sundesarrollo123",
    "connectString": "10.50.40.31/test"
}
*/
var connAttrs = {
    "user": "dbmcloude",
    "password": "mcloude",
    "connectString": "127.0.0.1/XE"
}

exports.getUser = function(req, res, next){
  "use strict";
  oracledb.getConnection(connAttrs, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }

    if(req.params.id)
    {

      connection.execute("SELECT * FROM tusuario WHERE idusuario = :id", [req.params.id], {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err || result.rows.length < 1) {
            res.set('Content-Type', 'application/json');
            var status = err ? 500 : 404;
            res.status(status).send(JSON.stringify({
                status: status,
                message: err ? "Error getting the user profile" : "User doesn't exist",
                detailed_message: err ? err.message : ""
            }));
        } else {
            res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
        }
        // Release the connection
        connection.release(
            function (err) {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("GET /user_profiles/" + req.params.id + " : Connection released");
                }
            });
    });


    }
    else
    {

      
    connection.execute("SELECT * FROM tusuario", {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
  }, function (err, result) {
      if (err) {
          res.set('Content-Type', 'application/json');
          res.status(500).send(JSON.stringify({
              status: 500,
              message: "Error getting the user profile",
              detailed_message: err.message
          }));
      } else {
          res.contentType('application/json').status(200);
          res.send(JSON.stringify(result.rows));
      }
      // Release the connection
      connection.release(
          function (err) {
              if (err) {
                  console.error(err.message);
              } else {
                  console.log("GET /user_profiles : Connection released");
              }
          });
  });

    } 

   

});


  
}


exports.deleteUser = function(req, res, next){
  "use strict";   
  Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Modulo '});
  //req.params.recordID

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("DELETE FROM tusuario WHERE idusuario = :recordID", [req.params.recordID], {
            autoCommit: true,
            outFormat: oracledb.OBJECT
        }, function (err, result) {
            if (err || result.rowsAffected === 0) {
                // Error
                res.set('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify({
                    status: 400,
                    message: err ? "Input Error" : "User doesn't exist",
                    detailed_message: err ? err.message : ""
                }));
            } else {
                // Resource successfully deleted. Sending an empty response body. 
                res.status(204).end();
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("DELETE /user_profiles/" + req.params.recordID + " : Connection released");
                    }
                });

        });
    });


 }





 exports.creaUser2s = function(req, res, next){
  "use strict";
  if ("application/json" !== req.get('Content-Type')) {
      res.set('Content-Type', 'application/json').status(415).send(JSON.stringify({
          status: 415,
          message: "Wrong content-type. Only application/json is supported",
          detailed_message: null
      }));
      return;
  }
 
  Bitacora.create(req.body.bitacora);
if(req.params.recordID!=='crea')
{ 
  oracledb.getConnection(connAttrs, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }

    connection.execute("INSERT INTO tusuario VALUES " +
        "(:idusuario, :desc1, :pass, :activado," +
        ":idempresa, :email, :idrolusuario) ", [req.body.idusuario, req.body.desc1,
                        req.body.pass, req.body.activado, req.body.idempresa, req.body.email,
                        req.body.idrolusuario], {
            autoCommit: true,
            outFormat: oracledb.OBJECT // Return the result as Object
        },
        function (err, result) {
            if (err) {
                // Error
                res.set('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify({
                    status: 400,
                    message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                    detailed_message: err.message
                }));
            } else {
                // Successfully created the resource
                res.status(201).set('Location', '/user_profiles/' + req.body.idusuario).end();
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /user_profiles : Connection released");
                    }
                });
        });
      });

}
else{





 

}

}


/*

app.put('/user_profiles/:USER_NAME', function (req, res) {
    "use strict";

    if ("application/json" !== req.get('Content-Type')) {
        res.set('Content-Type', 'application/json').status(415).send(JSON.stringify({
            status: 415,
            message: "Wrong content-type. Only application/json is supported",
            detailed_message: null
        }));
        return;
    }

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        var updateStatement = buildUpdateStatement(req);
        connection.execute(updateStatement.statement, updateStatement.bindValues, {
                autoCommit: true,
                outFormat: oracledb.OBJECT // Return the result as Object
            },
            function (err, result) {
                if (err || result.rowsAffected === 0) {
                    // Error
                    res.set('Content-Type', 'application/json');
                    res.status(400).send(JSON.stringify({
                        status: 400,
                        message: err ? "Input Error" : "User doesn't exist",
                        detailed_message: err ? err.message : ""
                    }));
                } else {
                    // Resource successfully updated. Sending an empty response body. 
                    res.status(204).end();
                }
                // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("PUT /user_profiles/" + req.params.USER_NAME + " : Connection released ");
                        }
                    });
            });
    });
});



*/


var buildUpdateStatement = function buildUpdateStatement(req) {
  "use strict";

  var statement = "",
      bindValues = {};
  if (req.body.DISPLAY_NAME) {
      statement += "DISPLAY_NAME = :DISPLAY_NAME";
      bindValues.DISPLAY_NAME = req.body.DISPLAY_NAME;
  }
  if (req.body.DESCRIPTION) {
      if (statement) statement = statement + ", ";
      statement += "DESCRIPTION = :DESCRIPTION";
      bindValues.DESCRIPTION = req.body.DESCRIPTION;
  }
  if (req.body.GENDER) {
      if (statement) statement = statement + ", ";
      statement += "GENDER = :GENDER";
      bindValues.GENDER = req.body.GENDER;
  }
  if (req.body.AGE) {
      if (statement) statement = statement + ", ";
      statement += "AGE = :AGE";
      bindValues.AGE = req.body.AGE;
  }
  if (req.body.COUNTRY) {
      if (statement) statement = statement + ", ";
      statement += "COUNTRY = :COUNTRY";
      bindValues.COUNTRY = req.body.COUNTRY;
  }
  if (req.body.THEME) {
      if (statement) statement = statement + ", ";
      statement += "THEME = :THEME";
      bindValues.THEME = req.body.THEME;
  }

  statement += " WHERE USER_NAME = :USER_NAME";
  bindValues.USER_NAME = req.params.USER_NAME;
  statement = "UPDATE USER_PROFILES SET " + statement;

  return {
      statement: statement,
      bindValues: bindValues
  };
};
