const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-node")

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: String,
    avatar: String,
    facebookId: String,
    googleId: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// before save user the password is hashed
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password)
    next();
});

// veryfi if password is correct with hash generated
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);