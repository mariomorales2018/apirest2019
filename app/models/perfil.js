var mongoose =require("mongoose");

    var PerfilSchema 		=	new  mongoose.Schema({
        nombre   		: { type : String, required : true },
        estado	: { type : String, required : true },
        unidad	: { type : String, required : true }
        }, {
        timestamps: true
        });



module.exports = mongoose.model('Perfil', PerfilSchema);

