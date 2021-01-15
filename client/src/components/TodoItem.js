import React, { useState } from "react";
import { useUpdateTodoItem, useDeleteTodoItem } from "../utils/todo-items";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

function TodoItem(props) {
  const { updateTodo } = useUpdateTodoItem();
  const { deleteTodo } = useDeleteTodoItem();
  const [isEditing, setIsEditing] = useState(false);
  const [todoInput, setTodoInput] = useState(props.task);

  const handleChange = () => {
    updateTodo({
      variables: {
        todo: props.id,
        isComplete: !props.completed,
        name: props.task,
      },
    });
  };
  const deleteTodoItem = () => {
    deleteTodo({
      variables: { todo: props.id },
    });
  };

  const updateTodoItem = () => {
    console.log("updateing. ");
    updateTodo({
      variables: {
        todo: props.id,
        isComplete: props.completed,
        name: todoInput,
      },
    });
    setIsEditing(false);
  };

  console.log("props from todoItem: ", props);
  return (
    <div style={{ fontSize: "20px" }}>
      {!isEditing ? (
        <li>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={props.completed}
          />
          <span onClick={() => setIsEditing(true)}>{props.task}</span>
          <span>
            - <DeleteIcon onClick={deleteTodoItem} />
          </span>
        </li>
      ) : (
        <Box>
          <TextField
            autoFocus
            id="todo"
            label="Update todo"
            margin="normal"
            name="todo"
            onChange={(e) => setTodoInput(e.target.value)}
            variant="outlined"
            value={todoInput}
          />
          <CheckIcon
            htmlColor="#00e851"
            fontSize="large"
            onClick={updateTodoItem}
          />
          <CloseIcon
            htmlColor="red"
            fontSize="large"
            onClick={() => {
              setIsEditing(false);
              setTodoInput(props.task);
            }}
          />
        </Box>
      )}
    </div>
  );
}

export default TodoItem;
