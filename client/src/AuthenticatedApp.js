import Dashboard from "./screens/Dashboard";
import { Switch, Route } from "react-router-dom";
import AuthenticatedHome from "./screens/AuthenticatedHome";

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/">
        <AuthenticatedHome />
      </Route>
    </Switch>
  );
}

export default AuthenticatedApp;
