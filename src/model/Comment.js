const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentsSchema = new mongoose.Schema({
    content: String,
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports =  mongoose.model('Comment', CommentsSchema);