import { Password } from '@mui/icons-material';
import { Avatar, Box, createTheme, CssBaseline, ThemeProvider, Typography, TextField, 
          FormControl, Link, Grid, Button, Container, Select, MenuItem,
          InputLabel} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react'
import axios from 'axios';

function Copyrights(props) {
  return (
    <Typography variant="body2" color="text.secondry" align='center' {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.acehealthcare.lk/">
      Ace Healthcare
      </Link>{' '}
      {new Date().getFullYear()}. All rights reserved.
    </Typography>
  );
}
const defaultTheme = createTheme();
  
export default function Register() {
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [epfNumber, setEpfNumber] = useState("");

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log('Submit event triggered!');

    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
        jobPosition: role,
        epfNumber
      });
      console.log('User Registered:',response.data);
    } catch(error){
      if(error.response){
        console.error('Error response:', error.response.data);
      } else if(error.request){
        console.error('Error request:', error.request);
      } else{
        console.error('Error message', error.message);
      }
    }
    
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
            <Avatar sx={{ m:1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant='h5'>
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete = "given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Job Position</InputLabel>
                <Select
                id="jobPosition"
                value={role}
                label="Job Position"
                onChange={handleChangeRole}
                >
                  <MenuItem value= "">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="epfNumber"
                  label="EPF Number"
                  name="epfNumber"
                  // autoComplete="family-name"
                  value={epfNumber}
                  onChange={(e) => setEpfNumber(e.target.value)}
                />
                </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              <Grid item xs={12}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}>
              Sign Up
            </Button>
            </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            </Box>
        </Box>
        <Copyrights sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
