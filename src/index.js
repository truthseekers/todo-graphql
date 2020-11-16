// const { GraphQLServer } = require("graphql-yoga");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const typeDefs = require("./typedefs");
const express = require("express");

const PORT = 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});

// server.start(() => console.log(`server running on localhost:4000`));
