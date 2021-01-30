import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useSignup } from "../utils/hooks";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useButtonStyles } from "../styles/styles";

function Signup() {
  const btnClasses = useButtonStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const { doSignup, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    doSignup({
      variables: {
        email,
        password,
        firstName,
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h3">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            id="firstName"
            label="First Name"
            margin="normal"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            required
            value={firstName}
            variant="outlined"
          />
          <TextField
            fullWidth
            id="email"
            label="email"
            margin="normal"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="185 Berry St. Suite 550"
            id="address"
            label="Address"
            margin="normal"
            name="address"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="San Francisco"
            id="city"
            label="City"
            margin="normal"
            name="city"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="California"
            id="state"
            label="State"
            margin="normal"
            name="state"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="94103"
            id="zip"
            label="ZIP"
            margin="normal"
            name="zip"
            required
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
            value={password}
            type="password"
            variant="outlined"
          />
          <CardElement />
          <Button
            classes={btnClasses}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </Container>
  );
}

export default Signup;
