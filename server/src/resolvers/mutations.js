const { Stripe } = require("stripe");
require("dotenv").config();
const stripe = new Stripe(process.env.SECRET_KEY);

const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");

const Mutation = {
  signup: async (parent, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);

    const customer = await stripe.customers.create({
      name: args.firstName,
      payment_method: args.paymentMethod,
      invoice_settings: {
        default_payment_method: args.paymentMethod,
      },
    });

    console.log("stripe customer: ", customer);

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.FANCY_BIZ_TOOL }],
      default_payment_method: args.paymentMethod,
    });

    if (subscription.status === "incomplete") {
      console.log("problem!");
      throw new Error("There was a problem with your card");
    }

    console.log("made it past subscription!");

    return;

    await context.prisma.user.create({
      data: {
        firstName: args.firstName,
        email: args.email,
        age: args.age,
        password,
      },
    });

    const { user } = await context.authenticate("graphql-local", {
      email: args.email,
      password: args.password,
    });

    context.login(user);

    return user;
  },
  login: async (parent, { email, password }, context, info) => {
    console.log("login one");

    const { user } = await context.authenticate("graphql-local", {
      email,
      password,
    });

    console.log("in resolver: ", user);

    context.login(user);

    return user;
  },
  logout: (parent, args, context, info) => {
    console.log(context);
    context.logout();
  },
  deleteUser: async (parent, args, context, info) => {
    await context.prisma.todo.deleteMany({
      where: { userId: parseInt(args.userId) },
    });

    return context.prisma.user.delete({
      where: { id: parseInt(args.userId) },
    });
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
  },
  createTodo: (parent, args, context, info) => {
    if (!context.isAuthenticated()) {
      throw new AuthenticationError("Must be logged in to do that");
    }

    if (args.name.length <= 0) {
      throw new Error("Todo must not be blank!");
    }

    return context.prisma.todo.create({
      data: {
        name: args.name,
        isComplete: args.isComplete,
        user: { connect: { id: parseInt(args.userId) } },
      },
    });
  },
  deleteTodo: (parent, args, context, info) => {
    return context.prisma.todo.delete({
      where: { id: parseInt(args.todoId) },
    });
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
};

module.exports = { Mutation };
