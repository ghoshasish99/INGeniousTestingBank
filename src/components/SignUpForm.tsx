import React from "react";
import { useActor } from "@xstate/react";
import { Interpreter } from "xstate";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object, ref } from "yup";

import Footer from "./Footer";
import { SignUpPayload } from "../models";
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";

const validationSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  username: string().required("Username is required"),
  password: string()
    .min(4, "Password must contain at least 4 characters")
    .required("Enter your password"),
  confirmPassword: string()
    .required("Confirm your password")
    .oneOf([ref("password")], "Password does not match"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    color: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface Props {
  authService: Interpreter<AuthMachineContext, AuthMachineSchema, AuthMachineEvents, any, any>;
}

const SignUpForm: React.FC<Props> = ({ authService }) => {
  const classes = useStyles();
  const [, sendAuth] = useActor(authService);
  const initialValues: SignUpPayload & { confirmPassword: string } = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const signUpPending = (payload: SignUpPayload) => sendAuth({ type: "SIGNUP", ...payload });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div>
          <img style={{ width: 300, height: 70 }} src="/img/logo1.png" alt="Test Logo" />
        </div>
        <Typography component="h1" variant="h5" data-test="signup-title" color="secondary">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldValue }) => {
            setSubmitting(true);

            signUpPending(values);
          }}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Form className={classes.form}>
              <Field name="firstName">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    type="text"
                    color="secondary"
                    autoFocus
                    data-test="signup-first-name"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="lastName">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    type="text"
                    color="secondary"
                    data-test="signup-last-name"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="username">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    color="secondary"
                    data-test="signup-username"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    color="secondary"
                    data-test="signup-password"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="confirmPassword">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    id="confirmPassword"
                    data-test="signup-confirmPassword"
                    type="password"
                    color="secondary"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                data-test="signup-submit"
                disabled={!isValid || isSubmitting}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin">{"Have an account? Sign In"}</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
};

export default SignUpForm;
