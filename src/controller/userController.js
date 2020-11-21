const { ApolloError, AuthenticationError } = require("apollo-server-express");
const User = require("../model/User")
const jwtUtil = require("../util/jwtUtil")

const login = async ({username, password}, context) => {
    try {
        const {user} = await context.authenticate("graphql-local", {username, password})
        if(!user) throw new AuthenticationError("Invalid credentials")
        return {
            acces_token: jwtUtil.encode(user),
            username: user.username
        }

    } catch (error) {
        if(error instanceof AuthenticationError)  throw new AuthenticationError(`${error.message}`)
        throw new ApolloError(`${error.message}`);
    }
}

const register = async ({user}) => {
    try {
        const newUser = await new User(user).save()
        return {
            acces_token: jwtUtil.encode(user),
            username: newUser.username
        }  
    } catch (error){
        throw new ApolloError(`${error.message}`);
    }
}

module.exports = {
    login,
    register
}