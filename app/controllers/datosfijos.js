
var Perfil = require('../models/perfil');
var Moduloxx = require('../models/moduloxx');
var Permiso = require('../models/permiso');
var csv      = require('csv-express');
var Evento = require('../models/eventos');

var Participa = require('../models/participa');


var request = require('request');
  

var cleanName = function(str) {
        if (str == '') return str; // jQuery
      
        var special = ['&', 'O', 'Z', '-', 'o', 'z', 'Y', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', '.', ' ', '+'],
            normal = ['et', 'o', 'z', '-', 'o', 'z', 'y', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'd', 'n', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'n', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', '.', ' ', '+'];
        for (var i = 0; i < str.length; i++) {
            for (var j = 0; j < special.length; j++) {
                if (str[i] == special[j]) {
                    str = str.replace(new RegExp(str[i], 'gi'), normal[j]);
                }
            }
        }

        return str.toUpperCase();
    };


exports.getCombofijo = function(req, res, next){
       var sql='';

if(req.params.id=='buses-nelson')  
{   
        request('http://190.143.151.236:8500/ws/databuses.cfm', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   var importedJSON = JSON.parse(body);
                   res.json(importedJSON);
                }
              })

              
        
   
}
else
{

if(req.params.id=='catalogo-tipo')  
{   
        res.json([{id:'DIAS FESTIVOS',nombre:'DIAS FESTIVOS'},{id:'RUTAS',nombre:'RUTAS'},{id:'MATERIAS',nombre:'MATERIAS'},{id:'PERIODOSSUM',nombre:'PERIODOSSUM'} 
        ,{id:'TIPO UNIDADES',nombre:'TIPO UNIDADES'}]);
   
}
else
{
       if(req.params.id=='suscriptor-disp')  
       {   
               res.json([{id:'RFID interno',nombre:'RFID interno'} ,{id:'DPI',nombre:'DPI'},{id:'RFID externo',nombre:'RFID externo'},{id:'OTRO dispositivo',nombre:'OTRO dispositivo'},{id:'Ninguno',nombre:'Ninguno'}]);
          
       }
       else
       {
        if(req.params.id=='modulo-grupo')  
        {   
                res.json([{id:'USAC',nombre:'USAC'} ,{id:'BUSES',nombre:'BUSES'},{id:'TICKES',nombre:'TICKES'},{id:'TODOS',nombre:'TODOS'}]);
           
        }
        else
        {
                if(req.params.id=='user-rol')  
                {   
                        Perfil.find(function(err, todos) {
                                if (err){  res.send(err);  }
                                 res.json(todos);
                        });
                     
                }
                else
                {

                if(req.params.id=='excel-eventos')  
                {   
                        var filename   = "eventos.csv";

                        Participa.find({},function(err, todos2) {
                                if (err){ res.send(err); }
                                

                                if(todos2.length>0)   {  

                                     //   res.json(todos2);

                                        Evento.find({impresion:'Activo'}).lean().exec({}, function(err,todos) {
                                                if (err) res.send(err);
                                                var myData = [];
                                                var cc=0;
                                                for(var i = 0; i < todos.length;i++){
                                                       
                                                        for(var j = 0; j < todos2.length;j++){
                                                             
                                                                if(todos[i]._id==todos2[j].idevento)
                                                                {
                                                                        cc=cc+1;
                                                                }
                                                                        
                                                        }       


                                                myData.push({nombre:cleanName(todos[i].nombre),Noparticipantes:cc});
                                                cc=0;
                                                }
                                                
                                                res.statusCode = 200;
                                                res.setHeader('Content-Type', 'text/csv; charset=utf-8');
                                                res.setHeader("Content-Disposition", 'attachment; filename='+filename);
                                                res.csv(myData, true);
                                              //  res.json(todos2);  
                                        });

                                         
                                }
                               
                        });


                        
                     
                }
                else
                {

                        if(req.params.id=='excel-participa')  
                        {   
                                var filename   = "participantes.csv";
        
                                Participa.find({idevento:req.params.id2,estado:'Ingreso'}).sort({nombre:1}).exec(function(err, todos2) {
                                        if (err){ res.send(err); }
                                        
        
                                        if(todos2.length>0)   {  
        
                                                var myData = [];
                                                 for(var i = 0; i < todos2.length;i++){
               

                                                myData.push({nombre:cleanName(todos2[i].nombre) + ' '+ cleanName(todos2[i].apellido),fecha:todos2[i].fecha.substr(0,10),ingresos:cleanName(todos2[i].cuenta) });
                                                }
                                                
                                                res.statusCode = 200;
                                                res.setHeader('Content-Type', 'text/csv; charset=utf-8');
                                                res.setHeader("Content-Disposition", 'attachment; filename='+filename);
                                                res.csv(myData, true);
                                             
                                                 
                                        }
                                       
                                });
        
        
                                
                             
                        }
                        else
                        {
                        
                        Perfil.find({nombre:req.params.id},function(err, todos) {
                                if (err){ res.send(err); }
                                
                               
                                if(todos.length>0)   {  
                                        
                                
                                        Permiso.find({idrol:todos[0]._id},function(err, todos) {
                                                if (err){ res.send(err); }
                                                
                                               
                                                if(todos.length>0)   {  
                                                        
                                                        Moduloxx.find({},function(err, todos2) {
                                                                if (err){ res.send(err); }
                                                               
                                                                var myData = [];
                                                                for(var i = 0; i < todos.length;i++){
                                                                        for(var j = 0; j < todos2.length;j++){
                                                                                console.log(todos[i].nombre + '===' +todos2[i].nombre);
                                                                                if(todos[i].nombre==todos2[j].nombre)
                                                                                {
                                                                                        console.log(todos[i].nombre);
                                                                                        myData.push({idrol:todos[i].idrol,title:todos2[j].nombre,component: todos2[j].componente, tabComponent:todos2[j].tabcomponente,name:todos2[j].titulo,index:todos2[j].index,icon:todos2[j].icono,estado:todos2[j].estado,
                                                                                        permiso:todos[i].ingreso+','+todos[i].consulta+','+todos[i].eliminacion+','+todos[i].creacion+','+todos[i].actualizacion});
                                                
                                                                                        break;                
                                                                                }


                                                                        }          
                                                                      
                                                                       
                                
                                                                }
                                
                                                                 res.json(myData);
                                                        


                                                        
                                                    });       

                                                       
                                                
                                                }
                                                else
                                                {  res.status(500).send('NO EXISTE ROL ASIGNADO');      }
                                                
                                            });

                                      
                                
                                
                                }
                                else
                                {  res.status(500).send('NO EXISTE ROL ASIGNADO');      }
                                
                            });
                        }
                }}
               
            
        }}
}
}
    
}