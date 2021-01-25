import { useMutation, useQuery } from "@apollo/client";
import {
  NEW_TODO,
  UPDATE_TODO_ITEM,
  DELETE_TODO_ITEM,
} from "../graphql/mutations";
import { TODOS_QUERY } from "../graphql/queries";

function useCreateTodoItem() {
  const [createTodo, { error }] = useMutation(NEW_TODO, {
    update(cache, { data: { createTodo } }) {
      // const { todos } = cache.readQuery({
      //   query: TODOS_QUERY,
      //   variables: { filter: "", takeStatus: "incomplete" },
      // });
      // cache.writeQuery({
      //   query: TODOS_QUERY,
      //   variables: { filter: "", takeStatus: "incomplete" },
      //   data: {
      //     todos: [createTodo, ...todos],
      //   },
      // });
    },
    onError(error) {},
    refetchQueries: [
      {
        query: TODOS_QUERY,
      },
    ],
  });
  return { createTodo, error: error?.message };
}

function useUpdateTodoItem() {
  const [updateTodo] = useMutation(UPDATE_TODO_ITEM);
  return { updateTodo };
}

function useTodoItems(args) {
  const { data, loading, error } = useQuery(TODOS_QUERY, {
    variables: { filter: args.dashInput, takeStatus: args.takeStatus },
    fetchPolicy: "network-only",
  });
  console.log("todos from useTodoItems: ", data);
  return { data, loading, error };
}

function useDeleteTodoItem() {
  const [deleteTodo] = useMutation(DELETE_TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      // const todos = cache.readQuery({
      //   query: TODOS_QUERY,
      //   variables: { filter: "", takeStatus: "incomplete" },
      // });
      // let updatedListTodos = todos.todos.filter((elem) => {
      //   if (elem.id !== deleteTodo.id) {
      //     return elem;
      //   }
      // });
      // cache.writeQuery({
      //   query: TODOS_QUERY,
      //   variables: { filter: "", takeStatus: "complete" },
      //   data: {
      //     todos: updatedListTodos,
      //   },
      // });
    },
    refetchQueries: [
      {
        query: TODOS_QUERY,
        // variables: { filter: "" },
      },
    ],
  });
  return { deleteTodo };
}

export {
  useCreateTodoItem,
  useUpdateTodoItem,
  useTodoItems,
  useDeleteTodoItem,
};
