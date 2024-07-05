const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const DashboardRoutes = require('./routes/DashboardRoutes');
const EmployeeRoutes = require('./routes/EmployeeRoutes');
const AttendanceRoutes = require('./routes/attendanRoutes');
const ClassRoutes = require('./routes/ClassRoutes');
const ClassSection = require('./routes/ClassSection');
const HomeworkRoutes = require('./routes/Homework');
const cors = require('cors');
// const Homework = require('./models/Homework');

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Remove trailing slash
    optionsSuccessStatus: 200,
    credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.use('/api/employees', EmployeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/dashboard', DashboardRoutes);
app.use('/api/attendance', AttendanceRoutes);
app.use('/api/classes', ClassRoutes);
app.use('/api/class-section', ClassSection);
app.use('/api/homework', HomeworkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
