const { gql } = require('apollo-server-express');

// define the API schema 
module.exports = gql`
    type Query {
        getComments:[Comment]
        login(username: String!, password: String!):UserPayload
        register(user: InputUser!):UserPayload
    }

    type Mutation {
        addComment(comment: InputComment!):Comment
        updateComment(id: ID!, comment: InputComment!):Comment
        deleteComment(id: ID!):Comment
    }

    type User {
        _id: ID!
        username: String!
        password: String
        email: String!
        facebookId: String
        gooleId: String,
        comments:[Comment]

    }

    type UserPayload {
        acces_token: String!
        username: String!
    }

    type Comment {
        _id: ID!
        content: String!
        owner: User!
    }

    input InputComment {
        content: String!
    }

    input InputUser {
        username: String!
        password: String!
    }
`;