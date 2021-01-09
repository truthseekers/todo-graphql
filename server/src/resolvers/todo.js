const Todo = {
  user: (parent, _, context) => {
    return context.prisma.user.findOne({
      where: { id: parent.userId },
    });
  },
};

module.exports = { Todo };
