import { Button, Container, Paper, TextField, Typography } from "@mui/material";

import { bgGradient } from "./../../constants/color";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

const isAdmin = true;

const AdminLogin = () => {
  const secretKey = useInputValidation();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            onSubmit={submitHandler}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            <TextField
              required
              fullWidth
              type="password"
              margin="normal"
              label="Secret Key"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: "1rem" }}
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
