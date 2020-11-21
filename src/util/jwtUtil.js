const jwt = require("jsonwebtoken")

const encode =  ({username}) => {
    return jwt.sign({username}, process.env.JWT_SECRET)
}

module.exports = {
    encode
}