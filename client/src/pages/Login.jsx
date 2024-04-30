import { Container, Paper } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Container component={"main"} maxWidth="sx">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItem: "center",
          }}
        >
          {isLogin ? <span>Login</span> : <span>Register</span>}
        </Paper>
      </Container>
    </>
  );
};

export default Login;
