var mongoose =require("../mongodb1.js");

    var PerfilSchema 		=	new  mongoose.Schema({
        nombre   		: { type : String, required : true },
        estado	: { type : String, required : true },
        }, {
        timestamps: true
        });



module.exports = mongoose.model('Perfil', PerfilSchema);

