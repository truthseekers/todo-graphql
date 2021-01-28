import React from "react";

const AuthContext = React.createContext();

function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}

const AuthProvider = (props) => {
  return <AuthContext.Provider value="trees" {...props} />;
};

export { AuthProvider, useAuth };
