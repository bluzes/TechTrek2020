import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import authenticationService from '../services/authenticationService';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage(props) {

  React.useEffect(() => {
      if (localStorage.getItem('user')) {
          props.history.push("/")
      }

      const storedUsername = JSON.parse(localStorage.getItem("username"));
      if (storedUsername) {
        setLoginDetails({
          username: storedUsername.username,
          password: ''
        });
        setLoginValidation({...loginValidation,
        username: false})
      }

  }, []);

  const classes = useStyles();
  const [loginDetails, setLoginDetails] = React.useState({
      username: "",
      password: ""
  });

  const [loginValidation, setLoginValidation] = React.useState({
    username: true,
    password: true
  });
  
  const [loginSnack, setLoginSnack] = React.useState(false);
  const [isEmptySnack, setEmptySnack] = React.useState(true);
  const handleLoginSnackClose = () => {
      setLoginSnack(false)
  }
  const [remember, setRemember] = React.useState(false);

  const rememberName = event => {
    setRemember(event.target.checked)
  }

  const handleDetailsChange = event => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value
    });

    if (event.target.value.length === 0) {
        setLoginValidation({
        ...loginValidation,
        [event.target.name]: true
      })
    } else {
      setLoginValidation({
        ...loginValidation,
        [event.target.name]: false
      })
    }
  }

  const handleLogin = e => {
      e.preventDefault();
      if (loginValidation.username == true || loginValidation.password == true) {
        setLoginSnack(true);
        setEmptySnack(true);
      } else {
        authenticationService.login(loginDetails.username,loginDetails.password).then(
            res => {
              console.log("Result " + res);
              if (res) {
                if (remember) {
                  localStorage.setItem(
                    "username",
                    JSON.stringify({
                      username: loginDetails.username
                    })
                  );
                }
                else {
                  localStorage.removeItem("username");
                }
                props.history.push("/");
              } else {
                setLoginSnack(true);
                setEmptySnack(false);
              }
            },
            error => {
                setLoginSnack(true);
                setEmptySnack(false);
            }
            )   
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              error={loginValidation.username}
              label="Username"
              name="username"
              value={loginDetails.username}
              onChange={handleDetailsChange}
              autoFocus
              helperText={loginValidation.username ? "Please enter Username" : " "}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={loginValidation.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              value={loginDetails.password}
              onChange={handleDetailsChange}
              helperText={loginValidation.password ? "Please enter Password" : " "}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox 
                value="remember" 
                checked={remember} 
                value="remember" onChange={rememberName} color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Box mt={5}>DBS Team 13</Box>
          </form>
        </div>
      </Grid>
      <Snackbar open={loginSnack} autoHideDuration={2000} onClose={handleLoginSnackClose}>
            <Alert onClose={handleLoginSnackClose} severity="error">
              {isEmptySnack ? "Please enter both fields" : "Login failed, try again!"}
            </Alert>
          </Snackbar>
    </Grid>
    
  );
}