import { useQuery, gql } from "@apollo/client";
import Todos from "../components/Todos";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("data", data);

  return (
    <div>
      <Todos todoItems={data.todos} />
    </div>
  );
}

export default Dashboard;
