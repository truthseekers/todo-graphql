import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  SIGNUP_MUTATION,
} from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ME } from "../graphql/queries";

function useLoginMutation() {
  let history = useHistory();
  const [doLogin, { error, loading, client }] = useMutation(LOGIN_MUTATION, {
    onCompleted() {
      client.resetStore();
      history.push("/dashboard");
    },
    onError(error) {
      console.log("error: ", error);
    },
  });
  return { doLogin, error: error?.message, loading };
}

function useCurrentUser() {
  const meQuery = useQuery(ME);

  if (meQuery.loading) {
    return { currentUser: "" };
  }

  if (meQuery.data?.me) {
    return {
      currentUser: meQuery.data.me,
      status: "complete",
    };
  } else {
    return { currentUser: "", status: "complete" };
  }
}

function useSignup() {
  let history = useHistory();
  const [doSignup, { error, client }] = useMutation(SIGNUP_MUTATION, {
    onCompleted() {
      client.resetStore();
      history.push("/dashboard");
      window.location.assign(window.location);
    },
    onError() {
      // erros can be handled here.
    },
  });
  return { doSignup, error: error?.message };
}

function useLogout() {
  let history = useHistory();
  const [doLogout, { client }] = useMutation(LOGOUT_MUTATION, {
    onCompleted() {
      client.resetStore();
      history.push("/");
      window.location.assign(window.location);
    },
  });
  return { doLogout };
}

export { useLoginMutation, useCurrentUser, useSignup, useLogout };
