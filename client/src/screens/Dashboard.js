import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Todos from "../components/Todos";
import { useCreateTodoItem, useTodoItems } from "../utils/todo-items";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";

function Dashboard() {
  const [dashInput, setDashInput] = useState("");
  const { createTodo, error: createTodoError } = useCreateTodoItem();
  const { data, loading, error } = useTodoItems();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {error}</div>;
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
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="dashInput"
          label="add a todo"
          value={dashInput}
          onChange={(e) => setDashInput(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      {createTodoError && <Alert severity="error">{createTodoError}</Alert>}
      <Box align="center">
        <Todos />
      </Box>
    </Container>
  );
}

export default Dashboard;
