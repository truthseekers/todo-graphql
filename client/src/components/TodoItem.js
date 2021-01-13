import { useUpdateTodoItem } from "../utils/todo-items";

function TodoItem(props) {
  const { updateTodo } = useUpdateTodoItem();
  const handleChange = () => {
    updateTodo({
      variables: {
        todo: props.id,
        isComplete: !props.completed,
        name: props.task,
      },
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
      </li>
    </div>
  );
}

export default TodoItem;
