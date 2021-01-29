import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useUnauthenticatedStyles } from "../styles/styles";

export default function UnauthenticatedApp() {
  const classes = useUnauthenticatedStyles();
  let history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Fancy Business Tool
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Buy my fancy business tool! It's a very nice tool that will increase
          your productivity and help you grow your business for the low price of
          only $10/Mo
        </Typography>
      </Container>
      <Container
        className={classes.root}
        align="center"
        maxWidth="md"
        component="main"
      >
        <Button
          onClick={() => history.push("/login")}
          color="primary"
          variant="contained"
        >
          Log In
        </Button>
        <Button
          onClick={() => history.push("/signup")}
          color="primary"
          variant="contained"
        >
          Sign Up!
        </Button>
      </Container>
    </React.Fragment>
  );
}
