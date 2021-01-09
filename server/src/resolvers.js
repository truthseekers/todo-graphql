const { Query } = require("./resolvers/queries");
const { Mutation } = require("./resolvers/mutations");
const { User } = require("./resolvers/user");
const { Todo } = require("./resolvers/todo");

const resolvers = {
  Query,
  Mutation,
  User,
  Todo,
};

module.exports = {
  resolvers,
};
