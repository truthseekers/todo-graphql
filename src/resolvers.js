const { createUserId } = require("./utils");

const newUserId = createUserId();
const newTodoId = createUserId(); // only temporary.

const { users } = require("./data/users");
const { todos } = require("./data/todos");
const { usersOnTodos } = require("./data/usersOnTodos");

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
    todos: (parent, args, context, info) => {
      return todos;
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
      const userIndex = users.findIndex((elem) => elem.id == args.userId);

      users[userIndex] = { ...users[userIndex], ...args.input };
      return users[userIndex];
    },
    createTodo: (parent, args, context, info) => {
      const newTodo = {
        id: newTodoId(),
        name: args.name,
        isComplete: args.isComplete,
        userId: args.userId,
      };

      todos.push(newTodo);
      return newTodo;
    },
    deleteTodo: (parent, args, context, info) => {
      let todo;
      const todoToRemove = todos.findIndex((elem) => {
        if (elem.id == args.todoId) {
          todo = elem;
          return true;
        }
        return false;
      });
      todo ? todos.splice(todoToRemove, 1) : "";
      return todo;
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
    todos: (parent) => {
      console.log("parent: ", parent);
      const todoIds = [];

      usersOnTodos.foreach((elem) => {
        if (elem.userId == parent.id) {
          todoIds.push(elem.todoId);
        }
      });

      return todos.filter((elem) => {
        return todoIds.includes(elem.id);
      });

      // return todos.filter((elem) => elem.userId == parent.id);
    },
  },
  Todo: {
    users: (parent) => {
      return users.find((elem) => elem.id == parent.userId);
    },
  },
};

module.exports = {
  resolvers,
};
