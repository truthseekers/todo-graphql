import { gql } from "@apollo/client";

const TODOS_QUERY = gql`
  query todos($filter: String, $takeStatus: String) {
    todos(filter: $filter, takeStatus: $takeStatus) {
      id
      isComplete
      userId
      name
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
