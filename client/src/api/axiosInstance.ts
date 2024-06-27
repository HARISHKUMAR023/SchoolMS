// src/api/axiosInstance.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getTeachers = () => axios.get(`${API_URL}/teachers`);
export const getClasses = () => axios.get(`${API_URL}/classes`);
export const getSubjects = () => axios.get(`${API_URL}/subjects`);
export const getTimetable = () => axios.get(`${API_URL}/timetable`);
