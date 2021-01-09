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
  todos: (parent, args, context, info) => {
    return context.prisma.todo.findMany();
  },
  me: (parent, args, context, info) => {
    if (context.getUser()) {
      return context.getUser();
    }
  },
};

module.exports = { Query };
