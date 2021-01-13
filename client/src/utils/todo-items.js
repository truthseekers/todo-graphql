import { useMutation } from "@apollo/client";
import { NEW_TODO } from "../graphql/mutations";
import { TODOS_QUERY } from "../graphql/queries";

function useCreateTodoItem() {
  const [createTodo] = useMutation(NEW_TODO, {
    update(cache, { data: { createTodo } }) {
      const { todos } = cache.readQuery({
        query: TODOS_QUERY,
      });

      cache.writeQuery({
        query: TODOS_QUERY,
        data: {
          todos: [createTodo, ...todos],
        },
      });
    },
  });
  return { createTodo };
}

export { useCreateTodoItem };
