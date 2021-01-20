import { gql } from "@apollo/client";

const TODOS_QUERY = gql`
  query {
    todos {
      id
      name
      isComplete
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
