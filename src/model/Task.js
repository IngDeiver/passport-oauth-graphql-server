const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    content: String
});

module.exports =  mongoose.model('Task', TasksSchema);