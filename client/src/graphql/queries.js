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

export { TODOS_QUERY };
