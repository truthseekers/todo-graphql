import { useMutation, useQuery } from "@apollo/client";
import {
  NEW_TODO,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
} from "../graphql/mutations";
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

function useUpdateTodoItem() {
  const [updateTodo] = useMutation(UPDATE_TODO_ITEM);
  return { updateTodo };
}

function useTodoItems() {
  const { data, loading, error } = useQuery(TODOS_QUERY, {});
  return { data, loading, error };
}

function useDeleteTodoItem() {
  const [deleteTodo] = useMutation(DELETE_TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      console.log("deletetodo: ", deleteTodo);
      const todos = cache.readQuery({
        query: TODOS_QUERY,
      });

      let updatedListTodos = todos.todos.filter((elem) => {
        if (elem.id !== deleteTodo.id) {
          return elem;
        }
      });

      cache.writeQuery({
        query: TODOS_QUERY,
        data: {
          todos: updatedListTodos,
        },
      });
    },
  });
  return { deleteTodo };
}

export {
  useCreateTodoItem,
  useUpdateTodoItem,
  useTodoItems,
  useDeleteTodoItem,
};
