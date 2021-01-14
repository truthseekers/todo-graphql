import { useUpdateTodoItem, useDeleteTodoItem } from "../utils/todo-items";
import DeleteIcon from "@material-ui/icons/Delete";

function TodoItem(props) {
  const { updateTodo } = useUpdateTodoItem();
  const { deleteTodo } = useDeleteTodoItem();

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

  console.log("props from todoItem: ", props);
  return (
    <div style={{ fontSize: "20px" }}>
      <li>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={props.completed}
        />
        {props.task}
        <span>
          - <DeleteIcon onClick={deleteTodoItem} />
        </span>
      </li>
    </div>
  );
}

export default TodoItem;
