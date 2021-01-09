const User = {
  id: (parent) => parent.id,
  firstName: (parent) => {
    return parent.firstName;
  },
  email: (parent) => parent.email,
  age: (parent) => {
    return parent.age;
  },
  todos: (parent, args, context) => {
    return context.prisma.todo.findMany({
      where: { userId: parent.id },
    });
  },
};

module.exports = { User };
