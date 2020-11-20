const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password:String,
    email:String,
    facebookId:String,
    gooleId:String
});

module.exports =  mongoose.model('User', UserSchema);