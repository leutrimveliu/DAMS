import React, { useState, useEffect } from "react";
import { addRegister } from "../../../api/register";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  darkTheme: {
    backgroundColor: "#424242",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#f48fb1",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Digital Asset Management Systems "}
    </Typography>
  );
}

const RegisterForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [errMessage, setErrMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data, e) => {
    const registerData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await addRegister(registerData);

      setErrMessage(response.errMessage);

      setSuccessMessage(response.successMessage);
      e.target.reset();
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } catch (e) {}
  };
  useEffect(() => {}, [currentUser]);
  if (currentUser) {
    return <Redirect to={"/"} />;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              style={{ marginBottom: "20px" }}
              component="h1"
              variant="h5"
            >
              Register
            </Typography>
            <br />
            {errMessage && <Alert severity="error">{errMessage}</Alert>}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
            <br />

            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="firstName"
                variant="outlined"
                fullWidth
                label="First Name"
                type="text"
                id="firstName"
                inputRef={register({ required: true, minLength: 3 })}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.firstName && errors.firstName.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.firstName && errors.firstName.type === "minLength" && (
                  <span>
                    This field requires minimum length of 3 characters!
                  </span>
                )}
              </p>

              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                name="lastName"
                type="text"
                id="lastName"
                inputRef={register({ required: true, minLength: 3 })}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.lastName && errors.lastName.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.lastName && errors.lastName.type === "minLength" && (
                  <span>
                    This field requires minimum length of 3 characters!
                  </span>
                )}
              </p>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                type="email"
                id="email"
                name="email"
                inputRef={register({
                  required: true,
                  minLength: 6,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.email && errors.email.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.email && errors.email.type === "minLength" && (
                  <span>
                    This field requires minimum length of 6 characters!
                  </span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span>Invalid email address!</span>
                )}
              </p>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={register({ required: true, minLength: 6 })}
              />
              <p style={{ color: "red" }}>
                &#8203;
                {errors.password && errors.password.type === "required" && (
                  <span>This field is required!</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span>
                    This field requires minimum length of 6 characters!
                  </span>
                )}
              </p>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginBottom: "15px" }}
                type="submit"
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Switch checked={darkState} onChange={handleThemeChange} />
                </Grid>
                <Grid item>
                  {darkState ? (
                    <Link to="/login" style={{ color: "#fff" }} variant="body2">
                      {"You already have an account? Sign in"}
                    </Link>
                  ) : (
                    <Link to="/login" style={{ color: "#222" }} variant="body2">
                      {"You already have an account? Sign in"}
                    </Link>
                  )}
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterForm;
