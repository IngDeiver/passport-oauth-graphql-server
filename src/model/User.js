const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-node")

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password:String,
    email:{ type: String, unique: true },
    facebookId:{ type: String, unique: true },
    googleId:{ type: String, unique: true },
    comments:[{
        type: Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

// before save user the password is hashed
UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password)
    next();
});

// veryfi if password is correct with hash generated
UserSchema.method.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports =  mongoose.model('User', UserSchema);