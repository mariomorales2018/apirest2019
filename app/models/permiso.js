var mongoose =require("../mongodb1.js");

    var PermisoSchema 		=	new  mongoose.Schema({
        idrol   		: { type : String, required : true },
        nombre   		: { type : String, required : true },
        icon   		: { type : String },
        ingreso	: { type : Boolean },
        consulta	: { type : Boolean },
        eliminacion	: { type : Boolean },
        creacion	: { type : Boolean },
        actualizacion	: { type : Boolean },
        idpermiso   		: { type : String },
        }, {
        timestamps: true
        });



module.exports = mongoose.model('Permiso', PermisoSchema);

