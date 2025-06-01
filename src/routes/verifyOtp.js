const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/verifyotp', async (req, res) => {
    console.log("Verify OTP route hit");
    const { userId, otp } = req.body;
    console.log(req.body);
  
    try {
        const user = await User.findById( userId );
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'User not found' });
        }
    
        console.log(`Received OTP: ${otp}, Stored OTP: ${user.otp}`);
        console.log(`Current Time: ${Date.now()}, OTP Expiration: ${user.otpExpiration}`);

        if (user.otp === otp && user.otpExpiration > Date.now()) {
            console.log('OTP verification successful');
            user.otp = null;
            user.otpExpiration = null;
            await user.save();
    
          const token = jwt.sign({ userId: user._id, email: user.email, jobPosition: user.jobPosition }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.json({ success: true, token, user:{jobPosition: user.jobPosition} });
        } else {
          res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
          
        }
      } catch (err) {
        console.error('OTP verification error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
  });

module.exports = router;