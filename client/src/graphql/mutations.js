import { gql } from "@apollo/client";

const NEW_TODO = gql`
  mutation createTodo($newTodo: String!, $userId: ID!, $isComplete: Boolean!) {
    createTodo(name: $newTodo, isComplete: $isComplete, userId: $userId) {
      id
      name
      isComplete
      userId
    }
  }
`;

const UPDATE_TODO_ITEM = gql`
  mutation updateTodo($todo: ID!, $isComplete: Boolean!, $name: String!) {
    updateTodo(todoId: $todo, isComplete: $isComplete, name: $name) {
      id
      isComplete
      name
    }
  }
`;

const DELETE_TODO_ITEM = gql`
  mutation deleteTodoItem($todo: ID!) {
    deleteTodo(todoId: $todo) {
      id
      name
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      email
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export {
  NEW_TODO,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
};
