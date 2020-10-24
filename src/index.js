const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
    helloWorld: String!
    users: [User!]!
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
  },
  User: {
    id: (parent) => parent.id,
    firstName: (parent) => {
      console.log("what is the parent: ", parent);
      return parent.firstName;
    },
    email: (parent) => "ilikepie@pie.com",
    age: (parent) => {
      console.log("age is: ", parent.age);
      const randomNum = Math.floor(Math.random() * 4) + 1;
      return parent.age * randomNum;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`server running on localhost:4000`));
