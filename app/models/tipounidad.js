var mongoose = require('mongoose');

    var TipounidadSchema 		=	new  mongoose.Schema({
        nombre	: { type : String, required : true },
        codigo	: { type : String, required : true },
        }, {
        timestamps: true
        });

      

module.exports = mongoose.model('Tipounidad', TipounidadSchema);


