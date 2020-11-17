// const { GraphQLServer } = require("graphql-yoga");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const typeDefs = require("./typedefs");
const express = require("express");
const passport = require("passport");
const { GraphQLLocalStrategy, buildContext } = require("graphql-passport");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const SESSION_SECRET = "24jl234haosdih00v8e";

const PORT = 4000;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    console.log("Login two");

    const matchingUser = await prisma.user.findOne({
      where: {
        email: email,
      },
    });
    console.log("matchingUser: ", matchingUser);

    let error = matchingUser ? "" : new Error("User not found!");

    if (matchingUser) {
      const valid = await bcrypt.compare(password, matchingUser.password);

      error = valid ? "" : new Error("Invalid password");
    }

    console.log("Login three");
    done(error, matchingUser);
  })
);

const app = express();

app.use(
  session({
    genid: (req) => uuidv4(),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return buildContext({ req, prisma });
  },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});

// server.start(() => console.log(`server running on localhost:4000`));
