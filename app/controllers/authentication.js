var jwt = require('jsonwebtoken'); 
var User = require('../models/user');
var authConfig = require('../../config/auth');
var Bitacora = require('../models/bitacora');

function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role,
        password:request.password
    };
}
 
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
    Bitacora.create(req.body.bitacora);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}
 
exports.register = function(req, res, next){
 
    var email = req.body.email;
    var password = req.body.password;
   

      
    var bitacora= req.body.bitacora;
 
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
    Bitacora.create(bitacora);
    User.findOne({email: email}, function(err, existingUser){
 
        if(err){
            return next(err);
        }
 
        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }
 
        var user = new User({
            email: email,
            password: password,
            role: req.body.role,
            nombre        	: req.body.nombre        	,
            cui 	: req.body.cui 	,
            foto 	: req.body.foto 	,
            direccion   	: req.body.direccion   	,
            telefono    	: req.body.telefono    	,
            lenguaje    	: req.body.lenguaje    	,
            sexo    	: req.body.sexo    	,
            estado    	: req.body.estado ,
            nov    	: req.body.nov   , 	
            unidad    	: req.body.unidad   ,
            codpersonal    	: req.body.codpersonal   
         
        });
 
        user.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
 
        });
 
    });
 
}

exports.register2 = function(req, res, next){
 
    var email = req.body.email;
    var password2 = req.body.password;
    var bitacora= req.body.bitacora;
 
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
 
    if(!password2){
        return res.status(422).send({error: 'You must enter a password'});
    }
    Bitacora.create(bitacora);
    User.findOne({email: email}, function(err, user){
 
        if(err){
            return next(err);
        }
        user.password=password2
        user.save(function(err){
 
            if(err){
                return next(err);
            }
 
            
            res.json(setUserInfo(user));    
 
        });
 
    });
 
}

 
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
 
}