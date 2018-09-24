
var Estudiantevt = require('../models/estudiantevt');


exports.getEstudiantevt = function(req, res, next){
    if(req.params.codigo)
    { 
        Estudiantevt.find({carnet:req.params.codigo},function(err, todos) {
            if (err){ res.send(err); }
        
            if(todos.length>0)   {    res.json(todos);   }
            else
            {  res.status(500).send('NO EXISTE REGISTRO');      }
            
        });
  
    }
    else
    {

    }
    
    
 
}




   
 

 






