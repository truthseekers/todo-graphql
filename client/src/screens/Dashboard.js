import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useQuery, useMutation, gql } from "@apollo/client";
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

function Dashboard() {
  const { data, loading, error } = useQuery(TODOS_QUERY, {});
  const [dashInput, setDashInput] = useState("");
  const [createTodo] = useMutation(NEW_TODO, {
    update(cache, { data: { createTodo } }) {
      const { todos } = cache.readQuery({
        query: TODOS_QUERY,
      });

      cache.writeQuery({
        query: TODOS_QUERY,
        data: {
          todos: [createTodo, ...todos],
        },
      });
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createTodo({
      variables: {
        newTodo: dashInput,
        userId: 1,
        isComplete: false,
      },
    });
    setDashInput("");
  };

  console.log("data", data);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="dashInput"
          label="add a todo"
          value={dashInput}
          onChange={(e) => setDashInput(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      <Todos todoItems={data.todos} />
    </div>
  );
}

export default Dashboard;
