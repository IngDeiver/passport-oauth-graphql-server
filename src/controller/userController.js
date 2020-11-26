const { ApolloError, AuthenticationError } = require("apollo-server-express");
const User = require("../model/User")
const jwtUtil = require("../util/jwtUtil")

// all methods for logic User
const login = async ({username, password}, context) => {
    try {
        const {user} = await context.authenticate("graphql-local", {username, password})
        if(!user) throw new AuthenticationError("Invalid credentials")
        
        // return token for acces api and username
        return {
            acces_token: jwtUtil.encode(user),
            username: user.username,
            avatar: user.avatar
        }

    } catch (error) {
        if(error instanceof AuthenticationError)  throw new AuthenticationError(`${error.message}`)
        throw new ApolloError(`${error.message}`);
    }
}

const register = async ({user}) => {
    try {
        user['avatar'] = null
        const newUser = await new User(user).save()

        // return token for acces api and username
        return {
            acces_token: jwtUtil.encode(user),
            username: newUser.username,
            avatar: user.avatar
        }  
    } catch (error){
        throw new ApolloError(`${error.message}`);
    }
}

module.exports = {
    login,
    register
}