
var Unidadacademica = require('../models/unidadacademica');
var Bitacora = require('../models/bitacora');

exports.getUnidadacademica = function(req, res, next){
    if(req.params.id2)
    {   Unidadacademica.find({idtipounidad:req.params.id,_id:req.params.id2},function(err, todos) {
            if (err){ res.send(err); }
           
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
    }
    else
    { Unidadacademica.find({idtipounidad:req.params.id},function(err, todos) {
           if (err){  res.send(err);  }
            res.json(todos);
        });
    }
}
exports.deleteUnidadacademica = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Unidadacademica '});
    Unidadacademica.findByIdAndRemove({ _id: req.params.id  }, function(err, todo) {
        res.json(todo);
    });
}


exports.creaUnidadacademica2s = function(req, res, next){
   
 

    if(req.params.id!=='crea')
    {  Bitacora.create(req.body.bitacora);
        Unidadacademica.findById({ _id: req.params.id}, function (err, todo)  {
            if (err) {  res.send(err);  }
            else
            {  
                
                todo.idtipounidad        	=	req.body.idtipounidad        	||	todo.idtipounidad;        	;
                todo.nombre        	=	req.body.nombre        	||	todo.nombre        	;
               

                todo.save(function (err, todo){
                    if (err)     {  res.status(500).send(err.message)   }
                    res.json(todo);
                });
            }
        });
    
    }
    else{
        Bitacora.create(req.body.bitacora);
    Unidadacademica.create({  idtipounidad      	: req.body.idtipounidad     	,
        nombre        	: req.body.nombre        	,
      
       }
        , function(err, todo) {
        if (err){ 
          
            res.status(500).send(err.message)    }
    
        res.json(todo);

     
        

    });
}


}





