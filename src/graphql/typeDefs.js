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

    type Comment {
        _id: ID!
        content: String!
    }

    input InputComment {
        content: String!
    }
`;