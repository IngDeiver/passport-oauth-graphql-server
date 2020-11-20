const { gql } = require('apollo-server-express');


module.exports = gql`
    type Query {
        getTasks:[Task]
    }

    type Mutation {
        addTask(task: InputTask!):Task
        updateTask(id: ID!, task: InputTask!):Task
        deleteTask(id: ID!):Task
    }

    type Task {
        _id: ID!
        content: String!
    }

    input InputTask {
        content: String!
    }
`;