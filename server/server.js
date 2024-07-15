const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
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
const logger = require('pino')();
const http = require('http');
const socketIo = require('socket.io');
const systemInformation = require('systeminformation');



const app = express();
// const server = http.createServer(app);


// const io = socketIo(server, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST'],
//         credentials: true,
//     }
// });
// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

// app.get('/api/metrics', async (req, res) => {
//     try {
//         const metrics = await getServerMetrics();
//         res.json(metrics);
//     } catch (error) {
//         console.error('Error fetching server metrics:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Function to get server metrics
// const getServerMetrics = async () => {
//     try {
//         const cpuLoad = await systemInformation.currentLoad();
//         const mem = await systemInformation.mem();
//         const time = new Date().toISOString();

//         return {
//             time,
//             cpuLoad: cpuLoad.currentLoad !== undefined ? cpuLoad.currentLoad.toFixed(2) : null,
//             totalMemory: mem.total,
//             usedMemory: mem.active
//         };
//     } catch (error) {
//         console.error('Error fetching server metrics:', error);
//         return {
//             time: new Date().toISOString(),
//             cpuLoad: null,
//             totalMemory: null,
//             usedMemory: null
//         };
//     }
// };
// setInterval(async () => {
//     const metrics = await getServerMetrics();
//     io.emit('serverMetrics', metrics);
//     // logger.info('Emitted server metrics', metrics);
//     // console.log('Emitted server metrics', metrics);
// }, 1000); // every second

// io.on('connection', (socket) => {
//     console.log('New client connected', socket.id);
//     logger.info('New client connected', socket.id);
//     socket.on('disconnect', () => {
//         // logger.info('Client disconnected', socket.id);
//         console.log*('Client disconnected', socket.id);
//     });
// });

app.use('/api/employees', EmployeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/dashboard', DashboardRoutes);
app.use('/api/attendance', AttendanceRoutes);
app.use('/api/classes', ClassRoutes);
app.use('/api/class-section', ClassSection);
app.use('/api/homework', HomeworkRoutes);

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
