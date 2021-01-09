const gql = require("graphql-tag");

module.exports = gql`
  type Query {
    helloWorld: String!
    users(text: String): [User!]!
    user(userId: ID!): User!
    todos: [Todo!]!
    me: User
  }

  type Mutation {
    signup(
      firstName: String!
      email: String!
      password: String!
      age: Int
    ): User
    login(email: String!, password: String!): User
    logout: Boolean
    deleteUser(userId: ID!): User
    updateUser(userId: ID!, input: UserInput!): User
    createTodo(name: String!, isComplete: Boolean!, userId: ID!): Todo
    deleteTodo(todoId: ID!): Todo
    updateTodo(todoId: ID!, name: String, isComplete: Boolean): Todo
    deleteTodos(todoIds: [ID!]!): BatchPayload!
    resetTodos(todoIds: [ID!]!): BatchPayload!
  }

  type BatchPayload {
    count: Int!
  }

  input UserInput {
    firstName: String
    email: String
    age: Int
  }

  type User {
    id: ID!
    firstName: String!
    email: String!
    age: Int
    todos: [Todo!]!
  }

  type Todo {
    id: ID!
    name: String!
    isComplete: Boolean!
    user: User!
    userId: Int!
  }
`;
