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
import { useAuth } from "../context/AuthContext";
import Radio from "@material-ui/core/Radio";

function Dashboard() {
  const [isSearch, setIsSearch] = useState(false);
  const [takeStatus, setTakeStatus] = useState("incomplete");
  const { currentUser } = useAuth();
  const [dashInput, setDashInput] = useState("");
  const { createTodo, error: createTodoError } = useCreateTodoItem();

  const handleSubmit = (event) => {
    event.preventDefault();
    createTodo({
      variables: {
        newTodo: dashInput,
        userId: currentUser.id,
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
        <FormControlLabel
          control={
            <Radio
              checked={takeStatus === "complete"}
              onChange={() => setTakeStatus("complete")}
              color="primary"
              name="complete"
            />
          }
          label="complete"
        />
        <FormControlLabel
          control={
            <Radio
              checked={takeStatus === "incomplete"}
              onChange={() => setTakeStatus("incomplete")}
              color="primary"
              name="incomplete"
            />
          }
          label="Incomplete"
        />
        {!isSearch && (
          <Button fullWidth type="submit" variant="contained" color="primary">
            Add Todo
          </Button>
        )}
      </form>
      {createTodoError && <Alert severity="error">{createTodoError}</Alert>}
      <Box align="center">
        <Todos takeStatus={takeStatus} dashInput={isSearch ? dashInput : ""} />
      </Box>
    </Container>
  );
}

export default Dashboard;
