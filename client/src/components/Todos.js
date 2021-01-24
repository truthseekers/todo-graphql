import TodoItem from "./TodoItem";
import { useTodoItems } from "../utils/todo-items";

function Todos(props) {
  let todoRows = [];

  const { data, loading } = useTodoItems({
    dashInput: props.dashInput,
    takeStatus: props.takeStatus,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  data.todos.map((elem) => {
    todoRows.push(
      <TodoItem
        key={elem.id}
        id={elem.id}
        completed={elem.isComplete}
        task={elem.name}
      />
    );
  });

  return (
    <div>
      <h2>My Todos: </h2>
      {data.todos.length === 0 ? (
        <div>No Todos in this list!</div>
      ) : (
        <ul
          style={{
            listStyleType: "none",
            textDecoration:
              props.takeStatus === "complete" ? "line-through" : "",
          }}
        >
          {todoRows}
        </ul>
      )}
    </div>
  );
}

export default Todos;
