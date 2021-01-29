import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory, Link } from "react-router-dom";
import { useHeaderStyles } from "../styles/styles";
import { useLogout } from "../utils/hooks";
import { useAuth } from "../context/AuthContext";

function Header() {
  let history = useHistory();
  const { currentUser } = useAuth();
  const classes = useHeaderStyles();
  const { doLogout } = useLogout();
  console.log("currentUser: ", currentUser);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <MenuItem onClick={() => history.push("/")}>Home</MenuItem>
          {currentUser ? (
            <Fragment>
              <MenuItem
                onClick={() => {
                  doLogout();
                }}
              >
                Logout
              </MenuItem>
              <MenuItem>
                <Link className={classes.link} to="/dashboard">
                  Dashboard
                </Link>
              </MenuItem>
              <span>Welcome {currentUser.firstName}</span>
            </Fragment>
          ) : (
            <MenuItem onClick={() => history.push("/login")}>Login</MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
