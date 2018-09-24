var mongoose =require("../mongodb1.js");
 
var TodoSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: true
    }
 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Todo', TodoSchema);