const { AuthenticationError, ForbiddenError, ApolloError } = require("apollo-server-express")

module.exports = (err) => {
    if(err instanceof AuthenticationError) throw new AuthenticationError(err.message);
    if(err instanceof ForbiddenError) throw new ForbiddenError(err.message)
    if(err instanceof ApolloError) throw new ApolloError(err.message)
}