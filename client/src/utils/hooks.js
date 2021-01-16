import { LOGIN_MUTATION } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

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

export { useLoginMutation };
