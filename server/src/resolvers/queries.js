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

    let whereConditions = [
      { userId: parseInt(user.id) },
      { name: { contains: args.filter } },
    ];

    args.takeStatus === "complete"
      ? whereConditions.push({ isComplete: true })
      : null;

    args.takeStatus === "incomplete"
      ? whereConditions.push({ isComplete: false })
      : null;

    const todos = await context.prisma.todo.findMany({
      where: {
        AND: whereConditions,
      },
      skip: args.skip,
      take: args.take,
    });

    const count = await context.prisma.todo.count({
      where: {
        AND: whereConditions,
      },
    });

    return {
      todoItems: todos,
      count,
    };
  },
  me: (parent, args, context, info) => {
    if (context.getUser()) {
      return context.getUser();
    }
  },
};

module.exports = { Query };
