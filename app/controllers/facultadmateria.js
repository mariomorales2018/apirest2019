
var Facultadmateria = require('../models/facultadmateria');
var Bitacora = require('../models/bitacora');

exports.getFacultadmateria = function(req, res, next){
       if(req.params.id)
        {  
           
                Facultadmateria.find({_id:req.params.id},function(err, todos) {
                    if (err){ res.send(err); }
                   
                    if(todos.length>0)   {    res.json(todos);   }
                    else
                    {  res.status(500).send('NO EXISTE REGISTRO');      }
                    
                });
             
           
        }
        else
        { Facultadmateria.find(function(err, todos) {
               if (err){  res.send(err);  }
                res.json(todos);
            });
        }

 
}
exports.deleteFacultadmateria = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Facultadmateria '});
    Facultadmateria.findByIdAndRemove({ _id: req.params.recordID  }, function(err, todo) {
        res.json(todo);
    });
}


exports.creaFacultadmateria2s = function(req, res, next){
   
 
    Bitacora.create(req.body.bitacora);
if(req.params.recordID!=='crea')
{ 
    Facultadmateria.findById({ _id: req.params.recordID }, function (err, todo)  {
        if (err) {  res.send(err);  }
        else
        {  
            
            todo.idtipounidad        	=	req.body.idtipounidad        	||	todo.idtipounidad        	;
            todo.idunidadacademica        	=	req.body.idunidadacademica        	||	todo.idunidadacademica        	;
            todo.idmateria        	=	req.body.idmateria        	||	todo.idmateria        	;
            todo.estado        	=	req.body.estado        	||	todo.estado        	;

            todo.save(function (err, todo){
                if (err)     {  res.status(500).send(err.message)   }
                res.json(todo);
            });
        }
    });

}
else{

    Facultadmateria.find({idtipounidad        	: req.body.idtipounidad        	,
        idunidadacademica: req.body.idunidadacademica,
        idmateria: req.body.idmateria
        
         },function(err, todos) {
        if (err){ res.send(err); }
      
        if(todos.length>0)   {    res.status(500).send('Ya existe un Facultadmateria con este nombre'); }
        else
        {   

            Facultadmateria.create({
                idtipounidad        	: req.body.idtipounidad        	,
        idunidadacademica: req.body.idunidadacademica,
        idmateria: req.body.idmateria,
        estado: req.body.estado
              }
                , function(err, todo) {
                if (err){ 
                   
                    res.status(500).send(err.message)    }
            
                res.json(todo);
        
             
                
        
            });

            
             }
        
    });
   
 
}

}



