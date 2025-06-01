import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function OTPVerification({ history }) { 
    const defaultTheme = createTheme();
    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const email = localStorage.getItem('email');
    const location = useLocation();
    const { userId } = location.state || {}; 

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verifyotp', { 
        userId: userId, 
        otp: otp, 
      });
    
      // On success, store token and navigate to the relevant page
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        const token = localStorage.getItem('token');     
        console.log('Token:', token);                   
  
        if (res.data.user && res.data.user.jobPosition === 'Manager') {
          navigate('/');
        } else {
          navigate('/ClientHome');
        }
      } else {
        alert('Invalid OTP');
        console.error('OTP verification failed');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      alert('OTP Verification failed');
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        OTP Verification
                    </Typography>
                    <Box component="form" onSubmit={handleVerifyOTP} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="otp"
                        label="OTP"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Verify
                     </Button>
                    </Box>
                    
                </Box>
        </Container>
    </ThemeProvider>
  );
}

export default OTPVerification;