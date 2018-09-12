var mongoose 			=	require('mongoose');

var FacultadmateriaSchema = new mongoose.Schema({
    idtipounidad   		: { type : String, required : true },
    idunidadacademica   		: { type : String, required : true },
    idmateria  		: { type : String, required : true },
    estado	: { type : String, required : true },
    date 		: { type: Date, default: Date.now }
}, {
    timestamps: true
});
 

/* Export model for application usage */
module.exports = mongoose.model('Facultadmateria', FacultadmateriaSchema);
