import "./App.css";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import UnauthenticatedApp from "./screens/UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";
import { useCurrentUser } from "./utils/hooks";
import { useAuth } from "./context/AuthContext";

function App() {
  // const currentUser = { firstName: "Bobby" };
  // const currentUser = false;
  const { currentUser } = useCurrentUser();
  console.log("currentUser from App.js: ", currentUser);
  const test = useAuth();
  console.log("test: ", test);

  return (
    <div>
      <Header />
      {currentUser ? (
        <AuthenticatedApp />
      ) : (
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <UnauthenticatedApp />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
