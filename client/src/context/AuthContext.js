import React from "react";
import { useCurrentUser } from "../utils/hooks";

const AuthContext = React.createContext();

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }

  return context;
}

const AuthProvider = (props) => {
  const { currentUser, status } = useCurrentUser();

  const value = {
    currentUser,
  };

  if (status == "complete") {
    return <AuthContext.Provider value={value} {...props} />;
  } else {
    return <div>Loading...</div>;
  }
};

export { AuthProvider, useAuth };
