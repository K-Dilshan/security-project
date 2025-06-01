import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Snackbar, Stack } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.acehealthcare.lk/">
        Ace HealthCare
      </Link>{' '}
      {new Date().getFullYear()}. All rights reserved.
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setShowAlert(true);
      setEmailError('Please Enter your Email Address.');
      setPasswordError('');
      setOpenSnackbar(true);
    } else if (!emailRegex.test(email)) {
      setShowAlert(true);
      setEmailError('Please Enter a valid Email Address');
      setPasswordError('');
      setOpenSnackbar(true);
    } else if (!password) {
      setShowAlert(true);
      setEmailError('');
      setPasswordError('Please Enter your Password');
      setOpenSnackbar(true);
    } else {
      setShowAlert(false);
      setEmailError('');
      setPasswordError('');
      setOpenSnackbar(false);

      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: email,
          password: password,
        });

        if (response.data.otpRequired) {
          localStorage.setItem('email', email);
          navigate('/verify-otp', { state: { userId: response.data.userId } });
        } else {
          console.log('Error: OTP not sent');
        }
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data.message : error.message);
        setShowAlert(true);
        setEmailError('');
        setPasswordError(error.response? error.response.data.message:'Invalid Email or Password');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Request an accounat from Admin"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} >
            <Alert variant="filled" severity="error" onClose={handleCloseSnackbar} 
            // sx={{ bgcolor: 'background.paper' }} 
            >
            {emailError || passwordError}
          </Alert>
          </Snackbar>
      </Container>
    </ThemeProvider>
  )
}