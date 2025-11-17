import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object().shape({
//   name: yup.string().required("Full name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
// });

const SignUpPage = () => {
  const navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const onSubmit = async (data) => {
    console.log("Sign up data:", data);
    // Example: Call API, then redirect
    // await api.post("/register", data);
    navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #43cea2, #185a9d)",
      }}
    >
      <Card sx={{ width: 380, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={2}>
            Create Account
          </Typography>
          <form /*onSubmit={handleSubmit(onSubmit)} */ >
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                // {...register("name")}
                // error={!!errors.name}
                // helperText={errors.name?.message}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                // {...register("email")}
                // error={!!errors.email}
                // helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                // {...register("password")}
                // error={!!errors.password}
                // helperText={errors.password?.message}
              />
              <Button type="submit" variant="contained" fullWidth>
                Sign Up
              </Button>
              <Typography variant="body2" textAlign="center">
                Already have an account?{" "}
                <Link component="button" onClick={() => navigate("/auth/login")}>
                  Login
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
