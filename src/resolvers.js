const { createUserId } = require("./utils");

const newUserId = createUserId();
const newTodoId = createUserId(); // only temporary.

const { users } = require("./data/users");
const { todos } = require("./data/todos");

const resolvers = {
  Query: {
    helloWorld: () => `Hello world wahaaaaa! what a day!`,
    users: (parent, args, context, info) => {
      console.log(context);

      return context.prisma.user.findMany();

      // if (args.text) {
      //   return users.filter((elem) =>
      //     elem.firstName.toLowerCase().includes(args.text.toLowerCase())
      //   );
      // }
      // return users;
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
      return context.prisma.todo.findMany();
    },
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      return context.prisma.user.create({
        data: {
          firstName: args.firstName,
          email: args.email,
          age: args.age,
        },
      });

      // const userAlreadyExists = users.some((elem) => {
      //   return elem.email == args.email;
      // });

      // if (userAlreadyExists) {
      //   throw new Error("User already exists");
      // } else {
      //   const newUser = {
      //     id: newUserId(),
      //     firstName: args.firstName,
      //     email: args.email,
      //     age: args.age,
      //   };
      //   users.push(newUser);
      //   return newUser;
      // }
    },
    deleteUser: (parent, args, context, info) => {
      return context.prisma.user.delete({
        where: { id: parseInt(args.userId) },
      });

      // let user;
      // const userToRemove = users.findIndex((elem) => {
      //   if (elem.id == args.userId) {
      //     user = elem;
      //     return true;
      //   }
      //   return false; // passes test so stays in array.
      // });
      // user ? users.splice(userToRemove, 1) : "";
      // return user;
      // ? `Account for ${user.email} was deleted`
      // : "No user to delete";
    },
    updateUser: (_, args, context) => {
      return context.prisma.user.update({
        where: {
          id: parseInt(args.userId),
        },
        data: {
          firstName: args.input.firstName,
          email: args.input.email,
          age: args.input.age,
        },
      });
      // const userIndex = users.findIndex((elem) => elem.id == args.userId);

      // users[userIndex] = { ...users[userIndex], ...args.input };
      // return users[userIndex];
    },
    createTodo: (parent, args, context, info) => {
      return context.prisma.todo.create({
        data: {
          name: args.name,
          isComplete: args.isComplete,
        },
      });
      // const newTodo = {
      //   id: newTodoId(),
      //   name: args.name,
      //   isComplete: args.isComplete,
      //   userId: args.userId,
      // };

      // todos.push(newTodo);
      // return newTodo;
    },
    deleteTodo: (parent, args, context, info) => {
      return context.prisma.todo.delete({
        where: { id: parseInt(args.todoId) },
      });
      // let todo;
      // const todoToRemove = todos.findIndex((elem) => {
      //   if (elem.id == args.todoId) {
      //     todo = elem;
      //     return true;
      //   }
      //   return false;
      // });
      // todo ? todos.splice(todoToRemove, 1) : "";
      // return todo;
    },
    updateTodo: (_, args, context) => {
      return context.prisma.todo.update({
        where: {
          id: parseInt(args.todoId),
        },
        data: {
          name: args.name,
          isComplete: args.isComplete,
        },
      });
    },
    resetTodos: (parent, args, context, info) => {
      let todosToReset = args.todoIds.map((id) => {
        return parseInt(id);
      });
      return context.prisma.todo.updateMany({
        where: {
          id: {
            in: todosToReset,
          },
        },
        data: {
          isComplete: false,
        },
      });
    },
    deleteTodos: (parent, args, context, info) => {
      let newIds = args.todoIds.map((id) => {
        return parseInt(id);
      });
      return context.prisma.todo.deleteMany({
        where: {
          id: {
            in: newIds,
          },
        },
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
    todos: (parent) => {
      console.log("parent: ", parent);
      return todos.filter((elem) => elem.userId == parent.id);
    },
  },
  Todo: {
    // user: (parent) => {
    //   return users.find((elem) => elem.id == parent.userId);
    // },
  },
};

module.exports = {
  resolvers,
};
