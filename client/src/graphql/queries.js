import { gql } from "@apollo/client";

const TODOS_QUERY = gql`
  query todos($filter: String, $takeStatus: String, $skip: Int, $take: Int) {
    todos(filter: $filter, takeStatus: $takeStatus, skip: $skip, take: $take) {
      todoItems {
        id
        isComplete
        userId
        name
      }
      count
    }
  }
`;

const ME = gql`
  query {
    me {
      id
      email
      firstName
    }
  }
`;

export { TODOS_QUERY, ME };
