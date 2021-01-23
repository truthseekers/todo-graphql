import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Todos from "../components/Todos";
import { useCreateTodoItem, useTodoItems } from "../utils/todo-items";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function Dashboard() {
  const [isSearch, setIsSearch] = useState(false);
  const [dashInput, setDashInput] = useState("");
  const { createTodo, error: createTodoError } = useCreateTodoItem();

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

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="dashInput"
          label={isSearch ? "Search Todos" : "Add a todo"}
          value={dashInput}
          onChange={(e) => setDashInput(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSearch}
              onChange={() => setIsSearch(!isSearch)}
              color="primary"
              name="searchTodos"
            />
          }
          label="Search Todos"
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      {createTodoError && <Alert severity="error">{createTodoError}</Alert>}
      <Box align="center">
        <Todos dashInput={isSearch ? dashInput : ""} />
      </Box>
    </Container>
  );
}

export default Dashboard;
