var mongoose 			=	require('mongoose');

var AsignapcbSchema = new mongoose.Schema({
 
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
    idinterno: {
        type: String,
        required: true
    },
    date 		: { type: Date, default: Date.now }
}, {
    timestamps: true
});
 

/* Export model for application usage */
module.exports = mongoose.model('Asignapcb', AsignapcbSchema);
