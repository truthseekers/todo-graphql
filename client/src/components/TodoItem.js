function TodoItem(props) {
  console.log("props from todoItem: ", props);
  return (
    <div style={{ fontSize: "20px" }}>
      <li>
        <input type="checkbox" checked={props.completed} />
        {props.task}
      </li>
    </div>
  );
}

export default TodoItem;
