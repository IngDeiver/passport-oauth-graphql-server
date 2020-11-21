const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-node")

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

UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password)
    next();
});

UserSchema.method.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports =  mongoose.model('User', UserSchema);