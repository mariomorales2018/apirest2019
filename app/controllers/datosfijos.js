
var Perfil = require('../models/perfil');
var Moduloxx = require('../models/moduloxx');
var Permiso = require('../models/permiso');

exports.getCombofijo = function(req, res, next){
       var sql='';
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
                                                                                if(todos[i].nombre==todos2[i].nombre)
                                                                                {
                                                                                        myData.push({idrol:todos[i].idrol,title:todos2[i].nombre,component: todos2[i].componente, tabComponent:todos2[i].tabcomponente,name:todos2[i].titulo,index:todos2[i].index,icon:todos2[i].icono,estado:todos2[i].estado,
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
       

    
}