import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";

import { loginUser } from '../../store/actions/userAction';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const temp = {};
    if (!form.email) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) temp.email = "Invalid email";
    if (!form.password) temp.password = "Password is required";
    else if (form.password.length < 6)
      temp.password = "Minimum 6 characters required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (values) => {
    setLoading(true);
    console.log('values', values);
    dispatch(loginUser(values))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => {
        console.log(err);
        Notification.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <Card sx={{ width: 380, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" fontWeight={600} mb={2}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl fullWidth error={!!errors.email}>
                <TextField
                  name="email"
                  label="Email"
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                {errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.password}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                {errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>

              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>

              <Typography textAlign="center" variant="body2">
                Don’t have an account?{" "}
                <Link component="button" onClick={() => navigate("/auth/sign-up")}>
                  Sign Up
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
