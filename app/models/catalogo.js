var mongoose =require("../mongodb1.js");

    var CatalogoSchema 		=	new  mongoose.Schema({
        tipo   		: { type : String, required : true },
        nombre   		: { type : String},
        fecha   		: { type : Date},
        foto 	: { type : String },
        estado	: { type : String, required : true }
       
        }, {
        timestamps: true
        });



module.exports = mongoose.model('Catalogo', CatalogoSchema);

