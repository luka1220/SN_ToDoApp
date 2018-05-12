

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ToDoSchema   = new Schema({
    content: String,
    deadline: String,
    procentage: Number
});

module.exports = mongoose.model('ToDo', ToDoSchema);