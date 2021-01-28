import React from "react";
import TodoItem from "./TodoItem";
import { useTodoItems } from "../utils/todo-items";
import Pagination from "./Pagination";

function Todos(props) {
  let todoRows = [];
  const [skip, setSkip] = React.useState(0);
  const { data, loading } = useTodoItems({
    dashInput: props.dashInput,
    takeStatus: props.takeStatus,
    skip,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  data.todos.todoItems.map((elem) => {
    todoRows.push(
      <TodoItem
        key={elem.id}
        id={elem.id}
        completed={elem.isComplete}
        task={elem.name}
      />
    );
  });

  const paginate = (pageNumber) => setSkip((pageNumber - 1) * 5);

  return (
    <div>
      <h2>
        {props.takeStatus === "incomplete" ? "Incomplete " : "Complete "} Todos:{" "}
        {data.todos.count}
      </h2>
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
      <Pagination
        todosPerPage={5}
        totalTodos={data.todos.count}
        paginate={paginate}
      />
    </div>
  );
}

export default Todos;
