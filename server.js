require('dotenv').config()
const express = require('express');
const app = express();
const port = 3002
const morgan = require('morgan');
const cors = require('cors');
const UserRoutes = require('./routes/userRoutes')


// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Database connection
require('./db/db');


// Routes
app.use('/api/users', UserRoutes);


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
  
});
