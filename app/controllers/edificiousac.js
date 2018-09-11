
var Edificiousac = require('../models/edificiousac');
var Bitacora = require('../models/bitacora');

exports.getEdificiousac = function(req, res, next){
    if(req.params.id2)
    {   Edificiousac.find({idunidadacademica:req.params.id,_id:req.params.id2},function(err, todos) {
            if (err){ res.send(err); }
           
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
    }
    else
    { Edificiousac.find({idtipounidad:req.params.id},function(err, todos) {
           if (err){  res.send(err);  }
            res.json(todos);
        });
    }
}
exports.deleteEdificiousac = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Edificiousac '});
    Edificiousac.findByIdAndRemove({ _id: req.params.id  }, function(err, todo) {
        res.json(todo);
    });
}


exports.creaEdificiousac2s = function(req, res, next){
   
 

    if(req.params.id!=='crea')
    {  Bitacora.create(req.body.bitacora);
        Edificiousac.findById({ _id: req.params.id}, function (err, todo)  {
            if (err) {  res.send(err);  }
            else
            {  
                
                todo.idtipounidad        	=	req.body.idtipounidad        	||	todo.idtipounidad;        	;
                todo.idunidadacademica        	=	req.body.idunidadacademica        	||	todo.idunidadacademica;        	;
                
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
    Edificiousac.create({  idtipounidad      	: req.body.idtipounidad     	,
        idunidadacademica:req.body.idunidadacademica,
        nombre        	: req.body.nombre        	,
      
       }
        , function(err, todo) {
        if (err){ 
          
            res.status(500).send(err.message)    }
    
        res.json(todo);

     
        

    });
}


}





