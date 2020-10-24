const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
    helloWorld: String!
}
`;

const resolvers = {
  Query: {
    helloWorld: () => `Hello world! what a day!`,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log(`server running on localhost:4000`));
