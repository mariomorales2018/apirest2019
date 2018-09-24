var mongoose =require("../mongodb1.js");
    var UnidadperiodoSchema 		=	new  mongoose.Schema({
        idtipounidad   		: { type : String, required : true },
        idunidadacademica   		: { type : String, required : true },
        nombre	: { type : String, required : true },
        }, {
        timestamps: true
        });

      

module.exports = mongoose.model('Unidadperiodo', UnidadperiodoSchema);

