import { gql } from "@apollo/client";

const TODOS_QUERY = gql`
  query todos($filter: String) {
    todos(filter: $filter) {
      id
      name
      userId
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
