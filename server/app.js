// src/app.js
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/index');
require('dotenv').config();
const app = express();

app.use(express.json());

connectDB();

app.use('/api', routes);

module.exports = app;
