

var Facplan = require('../models/unidadplan');
var Facmat = require('../models/facultadmateria');

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
        {   todo.idtipounidad        	={id:req.body.idtipounidad.id,nombre:req.body.idtipounidad.nombre   }   	;
            todo.idunidadacademica        	={id:req.body.idunidadacademica.id,nombre:req.body.idunidadacademica.nombre   }   	;
            todo.idperiodo        	=	{id:req.body.idperiodo.id,nombre:req.body.idperiodo.nombre   }   	;
            todo.no_orientacion        	=	req.body.no_orientacion        	||	todo.no_orientacion        	;
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

  console.log(req.body);



    Asignapcb.find({idtipounidad        	: req.body.tipounidad        	,
        idunidadacademica        	: req.body.unidadacademica        	,
        no_orientacion        	: req.body.no_orientacion        	,
        idperiodo        	: req.body.periodo        
        	, idinterno 	: req.body.idinterno  },function(err, todos) {
        if (err){ res.send(err); }
      
        if(todos.length>0)   {    res.status(500).send('Ya existe una Asignación para este periodo'); }
        else
        { 
            
            
  console.log('busca en las asignaciones');
  console.log(todos);

//todo lo que tengo que ganar

Facplan.find({idtipounidad        	: req.body.tipounidad        	,
    idunidadacademica        	: req.body.unidadacademica        	
         }).lean().exec({}, function(err,myData) {
    if (err) res.send(err);

    console.log('busca los planes');
    console.log(myData);
  
    Facmat.find({idtipounidad        	: req.body.tipounidad.id        	,
        idunidadacademica        	: req.body.unidadacademica.id 	
             }).lean().exec({}, function(err,myData0t) {
        if (err) res.send(err);
        var myData0 = [];
            
       
           if(myData0t[0].lenguaje==true){ myData0.push({idmateria:'Lenguaje'});      }
           if(myData0t[0].fisica==true){ myData0.push({idmateria:'Fisica'});      }
           if(myData0t[0].matematica==true){ myData0.push({idmateria:'Matematica'});      }
           if(myData0t[0].quimica==true){ myData0.push({idmateria:'Quimica'});      }
           if(myData0t[0].biologia==true){ myData0.push({idmateria:'Biologia'});      }
           console.log('busca las materias');
           console.log(myData0)

        Asignaest.find({idtipounidad        	: req.body.tipounidad        	,
            idunidadacademica        	: req.body.unidadacademica        	,
            no_orientacion        	: req.body.no_orientacion        	,
            idestudiante:req.body.idestudiante,aprobado:'Aprobado',
            idperiodo        	: req.body.periodo        }).lean().exec({}, function(err,myData2) {
            if (err) res.send(err);
            
            console.log(myData2)
             var myData0a = [];
             
             if(myData2.length==0)
             {
                myData0a=myData0    
             }
             else
             {
             for(var i = 0; i < myData0.length;i++){
                var gane=0;
                 for(var ii = 0; ii < myData.length;ii++){
                         if(myData0[i].idmateria==myData[ii].idmateria)
                         {   gane=1;   break;                     }
                         else{gane=0;}
                 }
                 if(gane==0)
                 {
                     myData0a.push({_id:myData0[i]._id,idtipounidad:myData0[i].idtipounidad,
                        idunidadacademica:myData0[i].idunidadacademica,
                        idmateria:myData0[i].idmateria,estado:myData0[i].estado});
                 }

             }

            }

                          var myData3 = [];
                        for(var i = 0; i < myData0a.length;i++){

                            for(var ii = 0; ii < myData.length;ii++){
                                    if(myData0a[i].idmateria==myData[ii].idmateria )
                                    {
                                      if( myData[ii].capacidad!=myData[ii].asignados)
                                      {
                                        myData3.push({_id:myData[ii]._id,idedificio:myData[ii].idedificio,idsalon:myData[ii].idsalon
                                            ,idhorario:myData[ii].idhorario,idmateria:myData[ii].idmateria
                                            ,capacidad:myData[ii].capacidad,asignados:myData[ii].asignados,fexamen:myData[ii].fexamen});
        
                                        break;

                                      }
                                        
                                    }
                            }
                        }

     console.log(myData3)
     res.json(myData3);

/*
                        Asignapcb.create({ idtipounidad        	: req.body.tipounidad        	,
                            idunidadacademica        	: req.body.unidadacademica        	,
                            no_orientacion        	: req.body.no_orientacion        	,
                            idperiodo        	: req.body.periodo        	,
                            nombre 	: req.body.nombre, 	
                            idestudiante 	: req.body.idestudiante, 	
                            idinterno 	: req.body.idinterno
                        }
                            , function(err, todo) {
                            if (err){ 
                            
                                res.status(500).send(err.message)    }
                        //crea todas las asignaciones nuevas que tiene que sacar
                       
                        for(var i = 0; i < myData3.length;i++){
                         //   console.log('crea asignaest ' + myData3[i].fexamen)
                            Asignaest.create({ 
                                idasigna:todo._id,
                                idtipounidad        	: req.body.tipounidad        	,
                                idunidadacademica        	: req.body.unidadacademica        	,
                                no_orientacion        	: req.body.no_orientacion        	,
                                idperiodo        	: req.body.periodo        	,
                                nombre 	: req.body.nombre, 	
                                idestudiante 	: req.body.idestudiante, 	
                                idedificio:myData3[i].idedificio,
                                idsalon:myData3[i].idsalon,
                                idhorario:myData3[i].idhorario,
                                idmateria:myData3[i].idmateria,
                                fexamen:myData3[i].fexamen,
                                aprobado:'',
                                nota:'',
                                ingreso:'0'
                            });
                          

                            Facplan.findById({ _id:myData3[i]._id }, function (err, todo)  {
                                if (err) {  res.send(err);  }
                                else
                                {   todo.asignados        	=		Number(todo.asignados)+1       	;
                                    
                                    todo.save(function (err, todo){
                                        if (err)     {  console.log(err.message)   }
                                        //console.log(todo);
                                    });
                                }
                            });


                   }
                            res.json(todo);

                        });
*/

           
         });
        });

       
       
     });
 

    }
        
});
    

   






 
}

}



