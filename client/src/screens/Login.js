import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useLoginStyles } from "../styles/loginStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Login() {
  const classes = useLoginStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    //
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            variant="outlined"
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
        </form>
      </div>
    </Container>
  );
}
