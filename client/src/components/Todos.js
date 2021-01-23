import TodoItem from "./TodoItem";
import { useTodoItems } from "../utils/todo-items";

function Todos(props) {
  let todoRows = [];

  const { data, loading } = useTodoItems({
    dashInput: props.dashInput,
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
      My Todos
      {todoRows}
    </div>
  );
}

export default Todos;
