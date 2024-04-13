const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    user:{type:String, required:true}
});

const noteModel = mongoose.model("user", noteSchema);

module.exports = {
    noteModel
}