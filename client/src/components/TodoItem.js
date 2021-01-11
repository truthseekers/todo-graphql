import { useMutation, gql } from "@apollo/client";

const UPDATE_TODO_ITEM = gql`
  mutation updateTodo($todo: ID!, $isComplete: Boolean!, $name: String!) {
    updateTodo(todoId: $todo, isComplete: $isComplete, name: $name) {
      id
      isComplete
      name
    }
  }
`;

function TodoItem(props) {
  const [updateTodo] = useMutation(UPDATE_TODO_ITEM);

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
