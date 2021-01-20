import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ME } from "../graphql/queries";

function useLoginMutation() {
  let history = useHistory();
  const [doLogin, { error, loading, client }] = useMutation(LOGIN_MUTATION, {
    onCompleted() {
      console.log("onCompleted!");
      client.resetStore();
      history.push("/dashboard");
    },
    onError() {
      console.log("error");
    },
  });
  return { doLogin, error, loading };
}

function useCurrentUser() {
  const meQuery = useQuery(ME);

  if (meQuery.loading) {
    console.log("loading...");
    return { currentUser: "" };
  }

  if (meQuery.data?.me) {
    console.log("meQuery.data ", meQuery);
    return {
      currentUser: meQuery.data.me,
      status: "complete",
    };
  } else {
    console.log("meQuery no data? ", meQuery);

    return { currentUser: "", status: "complete" };
  }
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

export { useLoginMutation, useCurrentUser, useLogout };
