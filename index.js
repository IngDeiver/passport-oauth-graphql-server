//require('dotenv').config()
const express = require("express")
const app = express()
const { ApolloServer } = require('apollo-server-express');
const { buildContext } = require("graphql-passport");
const passport = require("passport")
const {AuthenticationError} = require("apollo-server-express")

// http server config
const PORT = 4000
app.set("port", process.env.PORT || PORT)


// database
require("./src/config/database")


// middlewares
app.use(passport.initialize());

//passport
require("./src/passport/facebookStrategy")
require("./src/passport/googleStrategy")
require("./src/passport/localStrategy")
require("./src/passport/jwtStrategy")


// graphql server
const typeDefs = require('./src/graphql/typeDefs'); 
const resolvers  = require("./src/graphql/resolvers")
const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => buildContext({ req })
  });
graphqlServer.applyMiddleware({ app });

// http server
app.listen({ port: app.get("port") }, () =>
  console.log(`🚀 Server ready at port: ${app.get("port")}`)
)
