const { AuthenticationError } = require("apollo-server-express");

const Query = {
  helloWorld: () => `Hello world wahaaaaa! what a day!`,
  users: (parent, args, context, info) => {
    console.log(context);

    return context.prisma.user.findMany();
  },
  user: (parent, args, context, info) => {
    return context.prisma.user.findOne({
      where: { id: parseInt(args.userId) },
    });
  },
  todos: async (parent, args, context, info) => {
    if (!context.isAuthenticated()) {
      throw new AuthenticationError("Must be logged in to view todos");
    }

    const user = await context.getUser();

    return context.prisma.todo.findMany({
      where: {
        AND: [
          { userId: parseInt(user.id) },
          { name: { contains: args.filter } },
        ],
      },
    });
  },
  me: (parent, args, context, info) => {
    if (context.getUser()) {
      return context.getUser();
    }
  },
};

module.exports = { Query };
