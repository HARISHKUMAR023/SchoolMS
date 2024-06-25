const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const DashboardRoutes = require('./routes/DashboardRoutes')
const EmployeeRoutes = require('./routes/EmployeeRoutes')
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173/',
    optionsSuccessStatus: 200,
  };
  
  app.use(cors());
app.use(express.json());

app.use('/api/employees', EmployeeRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/students' , studentRoutes)
app.use('/api/dashboard', DashboardRoutes)
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
