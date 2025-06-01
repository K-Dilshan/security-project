const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const router = express.Router();
const nodemailer = require('nodemailer');
const sendOtpEmail = require('../api/otpService');

router.post('/register', async (req, res) =>    {
    const { firstName, lastName, email, password, jobPosition, epfNumber } = req.body;
    console.log('Request Body:', req.body);

    try {
        let user = await User.findOne({email});
        if (user) return res.status(400).json({message: 'User already exists'});

        user = new User({firstName, lastName, email, password, jobPosition, epfNumber});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //Create and sign JWT
        const payload = {userId: user._id, jobPosition: 'Manager'};
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {expiresIn: '1h'});

        //Respond with token and user info
        res.status(201).json({token, user: {id:user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, jobPosition: user.jobPosition, epfNumber: user.epfNumber}});
    } catch(err) {
        console.error('Error during user registration', err);
        res.status(500).json({message: 'Server Error', error: err.message});
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user){
         return res.status(400).json({ message: 'Invalid email' });
        }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

      // If password is correct, generate OTP and store temperaly in the db and Send OTP to user's email
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
      user.otp = otp
      user.otpExpiration = otpExpiration;
      await user.save();

      await sendOtpEmail(user.email, otp);
      console.log(`Generated OTP: ${otp}`);

      res.status(200).json({message:'OTP sent, please verify', otpRequired: true, userId: user._id, });


    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;