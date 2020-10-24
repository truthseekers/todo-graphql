const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
    helloWorld: String!
    users(text: String): [User!]!
    user(userId: ID!): User!
}

type Mutation {
  createUser(id: ID!, firstName: String!, email: String!, age: Int): User
}

type User {
    id: ID!
    firstName: String!
    email: String!
    age: Int
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
      if (args.text) {
        return users.filter((elem) =>
          elem.firstName.toLowerCase().includes(args.text.toLowerCase())
        );
      }
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
  Mutation: {
    createUser: (parent, args, context, info) => {
      const newUser = {
        id: args.id,
        firstName: args.firstName,
        email: args.email,
        age: args.age,
      };

      const userAlreadyExists = users.some((elem) => {
        return elem.email == args.email;
      });

      if (userAlreadyExists) {
        throw new Error("User already exists");
      } else {
        users.push(newUser);
        return newUser;
      }
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
