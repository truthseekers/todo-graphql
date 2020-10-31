const { GraphQLServer } = require("graphql-yoga");
const { resolvers } = require("./resolvers");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

server.start(() => console.log(`server running on localhost:4000`));
