import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";

function Header() {
  //   const currentUser = { firstName: "Bobby" };
  const currentUser = false;

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <MenuItem>Home</MenuItem>
          {currentUser ? (
            <Fragment>
              <MenuItem>Logout</MenuItem>
              <MenuItem>Dashboard</MenuItem>
              <span>Welcome {currentUser.firstName}</span>
            </Fragment>
          ) : (
            <MenuItem>Login</MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
