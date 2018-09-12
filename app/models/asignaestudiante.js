var mongoose 			=	require('mongoose');

var AsignaestudianteSchema = new mongoose.Schema({
    idasigna: {
        type: String,
        required: true
    },
    tipounidad: {
        type: String,
        required: true
    },
    unidadacademica: {
        type: String,
        required: true
    },
    no_orientacion: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    idestudiante: {
        type: String,
        required: true
    },
    idedificio: {
        type: String,
        required: true
    },
    idsalon: {
        type: String,
        required: true
    },
    idhorario: {
        type: String,
        required: true
    },
    idmateria: {
        type: String,
        required: true
    },
    fexamen: {
        type: String,
        required: true
    },
    aprobado: {
        type: String
    },
    ingreso: {
        type: String,
        required: true
    },
    nota: {
        type: String
      
    },
   
    date 		: { type: Date, default: Date.now }
}, {
    timestamps: true
});
 

/* Export model for application usage */
module.exports = mongoose.model('Asignaestudiante', AsignaestudianteSchema);
