

/**
 * Created by mmerida on 17/05/2018.
 */
var mongoose =require("../mongodb1.js");

var ConferenciaSchema = new mongoose.Schema({
    idevento: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    conferencista: {
        type: String,
        required: true
    },
    fechaini   		: { type : Date, required : true},
    fechafin   		: { type : Date, required : true},
    costo	: { type : String, required : true },
    nomax: { type : Number },
    estado: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Conferencia', ConferenciaSchema);