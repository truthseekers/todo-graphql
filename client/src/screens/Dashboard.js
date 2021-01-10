import { useQuery, gql } from "@apollo/client";

const TODOS_QUERY = gql`
  query {
    todos {
      id
      name
      isComplete
    }
  }
`;

function Dashboard() {
  const { data, loading, error } = useQuery(TODOS_QUERY, {});

  console.log("data", data);

  return <div>Dashboard page</div>;
}

export default Dashboard;
