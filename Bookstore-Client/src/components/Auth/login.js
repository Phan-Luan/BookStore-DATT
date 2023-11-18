import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { login, loginGoogle } from "../../services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Divider } from "@material-ui/core";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (isMounted) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login(formData);

      if (data) {
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("tokenTimestamp", data.data.token_timestamp);
        sessionStorage.setItem("user", JSON.stringify(data.data));
        window.location.href = "/";
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      if (isMounted) {
        if (error.response) {
          const newErrors = error.response.data.errors;
          setErrors({ ...errors, ...newErrors });

          if (error.response.status === 500) {
            setErrors({ ...errors, password: ["Sai mật khẩu"] });
          }
        }
      }
    }
  };
  // Khai báo một state để lưu trữ dữ liệu người dùng
  const [userData, setUserData] = useState(null);

  const handleGoogleLoginSuccess = async ({ credential }) => {
    if (credential) {
      const { name, sub, email } = jwt_decode(credential);
      const dataLogin = {
        name,
        sub,
        email,
      };
      try {
        const { data } = await loginGoogle(dataLogin);
        if (data) {
          sessionStorage.setItem("token", data.data.token);
          sessionStorage.setItem("tokenTimestamp", data.data.token_timestamp);
          sessionStorage.setItem("user", JSON.stringify(data.data));
          window.location.href = "/";
        }
      } catch (errors) {
        console.log(errors);
      }

      // history.push("");
      // toast.success(`Xin chào: ${user.name}, ID: ${user.sub}`);
    } else {
      console.error("Credential is undefined");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <span className="error text-danger">{errors.email[0]}</span>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="error text-danger">{errors.password[0]}</p>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Divider
            style={{ margin: "16px 0", color: "#000000", height: "2px" }}
          />
          <GoogleOAuthProvider clientId="715240243047-il2u3o5mnjg49t9p571qp3trlq1rqv1s.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
