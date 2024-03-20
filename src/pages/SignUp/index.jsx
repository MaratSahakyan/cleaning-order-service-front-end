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
import CustomTextfield from "../../components/CustomTextfield";
import { validationSchema } from "./validationSchema";
import { useAuth } from "../../auth/AuthProvider";

const initialValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUp = () => {
  const { signUp } = useAuth();

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      try {
        signUp(values);
        resetForm();
      } catch (error) {
        console.log("Error:", error);
      }
    },
    [signUp]
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextfield
                required
                fullWidth
                value={values.name}
                error={touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="given-name"
                name="name"
                id="name"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextfield
                required
                fullWidth
                value={values.lastName}
                error={touched.lastName && errors.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextfield
                required
                fullWidth
                value={values.email}
                error={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextfield
                required
                fullWidth
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
            </Grid>
            <Grid item xs={12}>
              <CustomTextfield
                required
                fullWidth
                value={values.repeatPassword}
                error={touched.repeatPassword && errors.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                id="repeatPassword"
                autoComplete="repeat-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(SignUp);
