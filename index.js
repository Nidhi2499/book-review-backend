const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

connectDB();

app.use('/api', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api', require('./routes/reviewRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
