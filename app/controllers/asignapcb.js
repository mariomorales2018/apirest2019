

var Facplan = require('../models/facultadplan');
var Asignaest = require('../models/asignaestudiante');
var Asignapcb = require('../models/asignapcb');
var Bitacora = require('../models/bitacora');

exports.getAsignapcb = function(req, res, next){
    if(req.params.id)
    { 
        Asignapcb.find({tipo:req.params.id2},function(err, todos) {
            if (err){ res.send(err); }
           
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
  
    }
    else
    {
        if(req.params.id)
        {  
           
                Asignapcb.find({_id:req.params.id},function(err, todos) {
                    if (err){ res.send(err); }
                   
                    if(todos.length>0)   {    res.json(todos);   }
                    else
                    {  res.status(500).send('NO EXISTE REGISTRO');      }
                    
                });
             
           
        }
        else
        { Asignapcb.find(function(err, todos) {
               if (err){  res.send(err);  }
                res.json(todos);
            });
        }

    }
 
}
exports.deleteAsignapcb = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Asignapcb '});
    Asignapcb.findByIdAndRemove({ _id: req.params.recordID  }, function(err, todo) {
        res.json(todo);
    });
}


exports.creaAsignapcb2s = function(req, res, next){
   
 
    Bitacora.create(req.body.bitacora);
if(req.params.recordID!=='crea')
{ 
    Asignapcb.findById({ _id: req.params.recordID }, function (err, todo)  {
        if (err) {  res.send(err);  }
        else
        {   todo.tipounidad        	=	req.body.tipounidad        	||	todo.tipounidad        	;
            todo.unidadacademica        	=	req.body.unidadacademica        	||	todo.unidadacademica        	;
            todo.no_orientacion        	=	req.body.no_orientacion        	||	todo.no_orientacion        	;
            todo.periodo        	=	req.body.periodo       	||	todo.periodo        	;
            todo.nombre    	=	req.body.nombre    	||	todo.nombre    	;
            todo.idestudiante    	=	req.body.idestudiante    	||	todo.idestudiante    	;
            todo.idinterno        	=	req.body.idinterno       	||	todo.idinterno        	;
            todo.save(function (err, todo){
                if (err)     {  res.status(500).send(err.message)   }
                res.json(todo);
            });
        }
    });

}
else{

    
    var myData = [];
//todo lo que tengo que ganar
    Facplan.find({tipounidad        	: req.body.tipounidad        	,
        unidadacademica        	: req.body.unidadacademica        	,
        periodo        	: req.body.periodo        }).lean().exec({}, function(err,todos) {
        if (err) res.send(err);
        
        for(var i = 0; i < todos.length;i++){
                myData.push({_id:todos[i]._id,idedificio:todos[i].idedificio,idsalon:todos[i].idsalon
                    ,idhorario:todos[i].idhorario,idmateria:todos[i].idmateria,capacidad:todos[i].capacidad,asignados:todos[i].asignados});
        }
        
       
     });
//todo lo que e ganado
     var myData2 = [];

     Asignaest.find({tipounidad        	: req.body.tipounidad        	,
         unidadacademica        	: req.body.unidadacademica        	,
         no_orientacion        	: req.body.no_orientacion        	,
         idestudiante:req.body.idestudiante,aprobado:'Aprobado',
         periodo        	: req.body.periodo        }).lean().exec({}, function(err,todos) {
         if (err) res.send(err);
         
         for(var i = 0; i < todos.length;i++){
                 myData2.push({_id:todos[i]._id,idedificio:todos[i].idedificio,idsalon:todos[i].idsalon
                     ,idhorario:todos[i].idhorario,idmateria:todos[i].idmateria,nota:todos[i].nota,fexamen:todos[i].fexamen});
         }
         
        
      });
 
      //lo que me tengo que asignas
     var myData3 = [];

     for(var i = 0; i < myData.length;i++){
        var gane=0;
        var id2t=''
        for(var ii = 0; ii < myData2.length;i++){
                if(myData[i].idmateria==myData2[i].idmateria)
                {
                    gane=1;
                    id2t=myData2[i]._id
                    break;
                }
        }
        if(gane==1)
        {

            myData3.push({_id:myData2[i]._id,idedificio:myData2[i].idedificio,idsalon:myData2[i].idsalon
                ,idhorario:myData2[i].idhorario,idmateria:myData2[i].idmateria,nota:myData2[i].nota
                ,fexamen:myData2[i].fexamen,_id2:id2t});
        }


   

     }


    Asignapcb.find({tipounidad        	: req.body.tipounidad        	,
        unidadacademica        	: req.body.unidadacademica        	,
        no_orientacion        	: req.body.no_orientacion        	,
        periodo        	: req.body.periodo        	, idinterno 	: req.body.idinterno  },function(err, todos) {
        if (err){ res.send(err); }
      
        if(todos.length>0)   {    res.status(500).send('Ya existe una Asignacion para este periodo'); }
        else
        {   

            //----------------------------------------------------- crea
            Asignapcb.create({ tipounidad        	: req.body.tipounidad        	,
                unidadacademica        	: req.body.unidadacademica        	,
                no_orientacion        	: req.body.no_orientacion        	,
                periodo        	: req.body.periodo        	,
                nombre 	: req.body.nombre, 	
                idestudiante 	: req.body.idestudiante, 	
                idinterno 	: req.body.idinterno
              }
                , function(err, todo) {
                if (err){ 
                   
                    res.status(500).send(err.message)    }
            //crea todas las asignaciones nuevas que tiene que sacar
                    for(var ii = 0; ii < myData3.length;i++)
                    {

                    }

                res.json(todo);
        
            });
//----------------------------------------------------- crea
            
             }
        
    });
   
 
}

}



