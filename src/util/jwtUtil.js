const jwt = require("jsonwebtoken")

// encode only username in once jwt token
const encode =  ({username}) => {
    return jwt.sign({username}, process.env.JWT_SECRET)
}

module.exports = {
    encode
}