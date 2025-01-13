import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import Alert from "@mui/material/Alert";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [error, seterror] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // validate the form data
    if (!email || !password) {
      seterror("Check submited data");
      return;
    }

    // Make the call to API to creat the user
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      seterror("Unaple to login user, please try agin");
      return;
    }

    const token = await response.json();

    if (!token) {
      seterror("Incorrect token");
      return;
    }

    login(email, token);
    navigate("/")

  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h5">Login to your Account</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
            width: "42%",
          }}
        >
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Login
          </Button>
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}
