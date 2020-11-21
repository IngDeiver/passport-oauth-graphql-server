const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    username: String,
    password:String,
    email:String,
    facebookId:String,
    googleId:String,
    comments:[{
        type: Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

module.exports =  mongoose.model('User', UserSchema);