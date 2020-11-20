const { gql } = require('apollo-server-express');


module.exports = gql`
    type Query {
        getComments:[Comment]
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

    type Comment {
        _id: ID!
        content: String!
        owner: User!
    }

    input InputComment {
        content: String!
    }
`;