
//var aws = require("aws-sdk");
//var ses = new aws.SES({"accessKeyId": "AKIAJU5GENLM4JCBYF6Q"
//, "secretAccessKey": "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", "region": "us-east-1"});

var Participa = require('../models/participa');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'usacenlinea2018@gmail.com',
           pass: 'ocitocit'
       }
   });


   
   
exports.getMail2 = function(req1, res){

  const mailOptions = {
    from: 'usacenlinea2018@gmail.com', // sender address
    to: req1.destino, // list of receivers
    subject: req1.subjet, // Subject line
    html: req1.html
  };

 
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
    res.status(500).send(err.sqlMessage);
    }
   
    
      
 });
  



    
}

exports.getMail = function(req, res, next){

  const mailOptions = {
    from: 'usacenlinea2018@gmail.com', // sender address
    to: req.body.destino+';mario.morales@mcloude.com', // list of receivers
    subject: req.body.subjet, // Subject line
    html: req.body.html,// plain text body
    actualiza: req.body.actualiza// plain text body
  };

 
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
    res.status(500).send(err.sqlMessage);
    }
    else
    {
      
      if(req.body.actualiza.tipo=='participantes')
      {

        Participa.findById({ _id: req.body.actualiza.id}, function (err, todo)  {
          if (err) {  res.send(err);  }
          else
          {  
              todo.estado 	=	req.body.actualiza.estado 	||req.body.actualiza.estado 	;
              todo.otros 	=	req.body.actualiza.otros 	||	req.body.actualiza.otros 	;
            
              todo.save(function (err, todo){
                  if (err)     {  res.status(500).send(err.message)   }
                  res.json(todo);
              });
          }
      });
        
      }
      else
      {

        res.json(info);
      }
      

    }
    
      
 });
  



    
}
