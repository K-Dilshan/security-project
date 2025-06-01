const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const authRoutes = require('./routes/auth');
const grnRoutes = require('./routes/grn');
const otpRoutes = require('./routes/verifyOtp');
const goodIssueRoutes = require('./routes/goodissue');

// Load environment variables from .env file
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/grn', grnRoutes);
app.use('/api/auth', otpRoutes);
app.use('/api/goodissue', goodIssueRoutes);

// Error handling, if any
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cyber-security', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Root URL
app.get('/', (req, res) => {
    res.send('Welcome');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));