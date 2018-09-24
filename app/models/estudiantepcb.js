var mongoose =require("mongoose");
    var EstudiantepcbSchema 		=	new  mongoose.Schema({
        bo_orientacion   		: { type : String},
        idmateria   		: { type : String},
        fecha_evaluacion   		: { type : String},
        no_oportunidad   		: { type : String},
        aprobacion   		: { type : String},
        anio_evaluacion   		: { type : String},
        nombres   		: { type : String}
        }, {
        timestamps: true
        });



module.exports = mongoose.model('Estudiantepcb', EstudiantepcbSchema);

