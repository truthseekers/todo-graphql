import { LOGIN_MUTATION } from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ME } from "../graphql/queries";

function useLoginMutation() {
  let history = useHistory();
  const [doLogin, { error, loading, client }] = useMutation(LOGIN_MUTATION, {
    onCompleted() {
      console.log("onCompleted!");
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

export { useLoginMutation, useCurrentUser };
