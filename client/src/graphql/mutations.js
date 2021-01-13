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

export { NEW_TODO };
