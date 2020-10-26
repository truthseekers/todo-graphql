const { createUserId } = require("./utils");

const newUserId = createUserId();

const { users } = require("./usersData");

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
      const userAlreadyExists = users.some((elem) => {
        return elem.email == args.email;
      });

      if (userAlreadyExists) {
        throw new Error("User already exists");
      } else {
        const newUser = {
          id: newUserId(),
          firstName: args.firstName,
          email: args.email,
          age: args.age,
        };
        users.push(newUser);
        return newUser;
      }
    },
    deleteUser: (parent, args, context, info) => {
      let user;
      const userToRemove = users.findIndex((elem) => {
        if (elem.id == args.userId) {
          user = elem;
          return true;
        }
        return false; // passes test so stays in array.
      });
      user ? users.splice(userToRemove, 1) : "";
      return user;
      // ? `Account for ${user.email} was deleted`
      // : "No user to delete";
    },
    updateUser: (_, args) => {
      const user = users.find((elem) => {
        if (elem.id == args.userId) {
          elem.firstName = args.firstName ? args.firstName : elem.firstName;
          elem.email = args.email ? args.email : elem.email;
          elem.age = args.age ? args.age : elem.age;
          return elem;
        }
      });
      return user;
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

module.exports = {
  resolvers,
};
