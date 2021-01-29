import "./App.css";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import UnauthenticatedApp from "./screens/UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

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
