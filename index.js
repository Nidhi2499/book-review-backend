const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

app.use(express.json());

connectDB();

app.use('/api', require('./routes/authRoutes')); // authentication routes
app.use('/api/books', require('./routes/bookRoutes')); // books routes
app.use('/api', require('./routes/reviewRoutes')); // review routes

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
