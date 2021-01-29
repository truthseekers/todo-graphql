import React from "react";
import { useAuth } from "../context/AuthContext";

function AuthenticatedHome() {
  const { currentUser } = useAuth();

  return (
    <div>
      Hi {currentUser.firstName}! Learn all the things you can do with our app
      here.
    </div>
  );
}

export default AuthenticatedHome;
