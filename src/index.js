const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
    helloWorld: String!
    users: [User!]!
    user(userId: ID!): User!
}

type User {
    id: ID!
    firstName: String!
    email: String!
    age: Int!
}

`;

let users = [
  {
    id: "123",
    firstName: "Cindy",
    email: "cindy@cindy.com",
    age: 27,
  },
  {
    id: "456",
    firstName: "Todd",
    email: "todd@todd.com",
    age: 31,
  },
];

const resolvers = {
  Query: {
    helloWorld: () => `Hello world! what a day!`,
    users: (parent, args, context, info) => {
      return users;
    },
    user: (parent, args, context, info) => {
      console.log(args);
      return users.find((user) => {
        if (user.id == args.userId) {
          return user;
        }
      });
    },
  },
  User: {
    id: (parent) => parent.id,
    firstName: (parent) => {
      return parent.firstName;
    },
    email: (parent) => parent.email,
    age: (parent) => {
      return parent.age;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`server running on localhost:4000`));
