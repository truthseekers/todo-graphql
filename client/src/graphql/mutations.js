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

export { NEW_TODO, UPDATE_TODO_ITEM };
