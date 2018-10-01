
var Nuevosalon = require('../models/nuevosalon');
var Facplan = require('../models/unidadplan');
var Facmat = require('../models/facultadmateria');

var Asignaest = require('../models/asignaestudiante');
var Asignapcb = require('../models/asignapcb');
var Bitacora = require('../models/bitacora');

exports.getAsignapcb = function(req, res, next){
    if(req.params.id3)
    { 
        
        Asignapcb.find({no_orientacion:req.params.id3},function(err, todos) {
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

    }}
 
}
exports.deleteAsignapcb = function(req, res, next){
   
    Bitacora.create({email: req.params.userID ,permiso:'Elimina',accion:'Elimina Asignapcb '});
    Asignapcb.findByIdAndRemove({ _id: req.params.recordID  }, function(err, todo) {
        res.json(todo);
    });
}


function getNextSequenceValue(myData3,myData3aa,req,res){
//mydata=todo lo que tengo que ganar
//mydata0=las materias que tengo que pasar
 //myData2= las que ya gane como estudiante
 //myData0a= las materia que tengo que ganar
 //myData3aa = si hay registros no hay vcupo
 //myData3 = lo que me puedo asignar

        if(myData3aa.length>0)
        { 
            Nuevosalon.create({ 
                nombre:'Solicitando salon para Unidad academica: ' + req.body.unidadacademica.nombre + ', Materia: '+  myData3aa[0].idmateria +', Edificio: '+  myData3aa[0].idedificio.nombre +' y Salon: '+  myData3aa[0].idsalon.nombre ,
                estado        	: 'Solicitando' ,
                correo:''       	
            });
//            console.log('No existe cupo para asignarse esta materia: '+  myData3aa[0].idmateria +' para el edificio: '+  myData3aa[0].idedificio.nombre +' salon: '+  myData3aa[0].idsalon.nombre +' , realize la asignacion mas tarde')
            res.status(500).send('No existe cupo para asignarse esta materia: '+  myData3aa[0].idmateria +', Intente asignarce más tarde')    
        }
        else
        {

      
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
                                       var myData3cc=myData3[i] 
                                        Asignaest.find({idtipounidad        	: req.body.tipounidad        	,
                                            idunidadacademica        	: req.body.unidadacademica  , 
                                            idperiodo        	: req.body.periodo      	,
                                            idedificio:myData3[i].idedificio,
                                            idsalon:myData3[i].idsalon,
                                            idhorario:myData3[i].idhorario,
                                            idmateria:myData3[i].idmateria
                                                  }).lean().exec({}, function(err,myasigcupo) {
                                            if (err) res.send(err);
                                                  var asigno=0
                                                  asigno=myasigcupo.length;
                                                  asigno=asigno+1;
                                              //    console.log('calcula el asignado')
                                                //  console.log(asigno)
                                                   
                                                            Asignaest.create({ 
                                                                idasigna:todo._id,
                                                                idtipounidad        	: req.body.tipounidad        	,
                                                                idunidadacademica        	: req.body.unidadacademica        	,
                                                                idperiodo        	: req.body.periodo        	,
                                                                idedificio:myData3cc.idedificio,
                                                                idsalon:myData3cc.idsalon,
                                                            
                                                                no_orientacion        	: req.body.no_orientacion        	,
                                                            
                                                                nombre 	: req.body.nombre, 	
                                                                idestudiante 	: req.body.idestudiante, 	
                                                                idhorario:myData3cc.idhorario,
                                                                idmateria:myData3cc.idmateria,
                                                                fexamen:myData3cc.fexamen,
                                                                aprobado:'',
                                                                nota:'',
                                                                ingreso:'0',
                                                                noasignado:asigno,
                                                                codfac:myData3cc.codfac,
                                                            });
                                        

                                                            Facplan.findById({ _id:myData3cc._id }, function (err, todo)  {
                                                                if (err) {  res.send(err);  }
                                                                else
                                                                {   todo.asignados        	=		Number(todo.asignados)+1       	;
                                                                    
                                                                    todo.save(function (err, todo){
                                                                        if (err)     {  console.log(err.message)   }
                                                                        //console.log(todo);
                                                                    });
                                                                }
                                                            });
                                        });

                                    }
                            
                                    res.json(todo);

                      
                });
        }
 }

exports.creaAsignapcb2s = function(req, res, next){
   
 
    Bitacora.create(req.body.bitacora);
if(req.params.recordID!=='crea')
{ 
    Asignapcb.findById({ _id: req.params.recordID }, function (err, todo)  {
        if (err) {  res.send(err);  }
        else
        {   todo.idtipounidad        	={id:req.body.idtipounidad.id,nombre:req.body.idtipounidad.nombre   }   	;
            todo.idunidadacademica        	={id:req.body.idunidadacademica.id,nombre:req.body.idunidadacademica.nombre,codigo:req.body.idunidadacademica.codigo   }   	;
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





    Asignapcb.find({idtipounidad        	: req.body.tipounidad        	,
        idunidadacademica        	: req.body.unidadacademica        	,
        no_orientacion        	: req.body.no_orientacion        	,
        idperiodo        	: req.body.periodo        
        	, idinterno 	: req.body.idinterno  },function(err, todos) {
        if (err){ res.send(err); }
      
        if(todos.length>0)   {    res.status(500).send('Ya existe una Asignación para este periodo'); }
        else
        { 
  
Facplan.find({idtipounidad        	: req.body.tipounidad        	,
    idunidadacademica        	: req.body.unidadacademica  
 //,   asignados:{$lt:capacidad}    	
         }).lean().exec({}, function(err,myData) {
    if (err) res.send(err);

    
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
   
        Asignaest.find({idtipounidad        	: req.body.tipounidad        	,
            idunidadacademica        	: req.body.unidadacademica        	,
            no_orientacion        	: req.body.no_orientacion        	,
            idestudiante:req.body.idestudiante,aprobado:'Aprobado',
            idperiodo        	: req.body.periodo        }).lean().exec({}, function(err,myData2) {
            if (err) res.send(err);
             var myData0a = [];
             
             //las materias que tengo que ganar
             if(myData2.length==0)
             {
                myData0a=myData0   //tengo que ganar todas 
               
             }
             else
             {
              //las materias que tengo que ganar
             for(var i = 0; i < myData0.length;i++){
                var gane=0;
                //las que ya gane
                 for(var ii = 0; ii < myData2.length;ii++){
                  
                         if(myData0[i].idmateria==myData2[ii].idmateria)
                         {   gane=1;   break;                     }
                         else{gane=0;}
                 }
                 if(gane==0)
                 {//no la e ganado
                     myData0a.push({idmateria:myData0[i].idmateria});
                 }

             }

            }

                          var myData3 = [];
                          var myData3aa = [];
                          
                          var cii=0;
                          //las materias qye tengo que ganar
                         // console.log(myData);
                        for(var i = 0; i < myData0a.length;i++){
                            //todo lo que esta planificado en el plan    
                            for(var ii = 0; ii < myData.length;ii++){
                                    if(myData0a[i].idmateria==myData[ii].idmateria )
                                    {
                                            if( myData[ii].capacidad!=(myData[ii].asignados))
                                            {//si hay cupo lo hago
                                                cii=0;
                                                myData3.push({_id:myData[ii]._id,idedificio:myData[ii].idedificio,idsalon:myData[ii].idsalon
                                                    ,idhorario:myData[ii].idhorario,idmateria:myData[ii].idmateria
                                                    ,capacidad:myData[ii].capacidad,asignados:'0',fexamen:myData[ii].fexamen,codfac:myData[ii].codfac});
                
                                                break;

                                            }
                                            else
                                            { 
                                                   cii=ii;
                                                 

                                            }
                                        
                                    }
                            }

                            //////////////////
                            if(cii>0)
                            {
                                myData3aa.push({_id:myData[cii]._id,idedificio:myData[cii].idedificio,idsalon:myData[cii].idsalon
                                    ,idhorario:myData[cii].idhorario,idmateria:myData[cii].idmateria
                                    ,capacidad:myData[cii].capacidad,asignados:'0',fexamen:myData[cii].fexamen,codfac:myData[cii].codfac});

                            }


                        }

//console.log('llega hasta aqui')

                        getNextSequenceValue(myData3,myData3aa,req,res);


           
         });
        });

       
       
     });
 

    }
        
});
    

   






 
}

}



