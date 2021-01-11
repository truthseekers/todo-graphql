import TodoItem from "./TodoItem";

function Todos(props) {
  let todoRows = [];
  console.log(props.todoItems);
  props.todoItems.map((elem) => {
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
