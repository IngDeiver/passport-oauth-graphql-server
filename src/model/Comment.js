const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    content: String
});

module.exports =  mongoose.model('Comment', CommentsSchema);