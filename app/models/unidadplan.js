var mongoose = require('mongoose');


    var UnidadplanSchema 		=	new  mongoose.Schema({
        idtipounidad :  		{    id	: { type : String, required : true },   nombre	: { type : String, required : true }        },
        idunidadacademica   		: {    id	: { type : String, required : true },   nombre	: { type : String, required : true }        },
        idperiodo   		: {    id	: { type : String, required : true },   nombre	: { type : String, required : true }        },
        idedificio: {    id	: { type : String, required : true },   nombre	: { type : String, required : true }        },
        idsalon: {    id	: { type : String, required : true },   nombre	: { type : String, required : true }        },
        nombre: {
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
            type: Number
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

      

module.exports = mongoose.model('Unidadplan', UnidadplanSchema);


