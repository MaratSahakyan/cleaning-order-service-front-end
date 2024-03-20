import React, { memo, useCallback } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import CustomTextfield from "../../components/CustomTextfield";
import { useAuth } from "../../auth/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { signIn } = useAuth();

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      try {
        signIn(values);
        resetForm();
      } catch (error) {
        console.log("Error:", error);
      }
    },
    [signIn]
  );

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3, width: "100%" }}
        >
          <CustomTextfield
            required
            fullWidth
            margin="normal"
            value={values.email}
            error={touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <CustomTextfield
            required
            fullWidth
            margin="normal"
            value={values.password}
            error={touched.password && errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(SignIn);
