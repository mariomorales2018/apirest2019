var mongoose 			=	require('mongoose');

var FacultadplanSchema = new mongoose.Schema({
 
    idtipounidad: {
        type: String,
        required: true
    },
    idunidadacademica: {
        type: String,
        required: true
    },
    idperiodo: {
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
    capacidad: {
        type: Number,
        required: true
    },
    asignados: {
        type: Number,
        required: true
    },
    fexamen: {
        type: Date,
        required: true
        , default: Date.now
    },
    date 		: { type: Date, default: Date.now }
}, {
    timestamps: true
});
 

/* Export model for application usage */
module.exports = mongoose.model('Facultadplan', FacultadplanSchema);
