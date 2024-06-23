import { AppThunk } from '../Store';
import { loginRequest, loginSuccess, loginFailure, logout } from './authSlice';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/auth'; // Replace with your API URL

interface LoginResponse {
  token: string;
}

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
    try {
      dispatch(loginRequest());
      const response = await axios.post<LoginResponse>(`${apiUrl}/login`, { username, password });
  
      if (response.status === 200) {
        dispatch(loginSuccess({ token: response.data.token }));
        localStorage.setItem('token', response.data.token);
        // Navigate to the dashboard
        window.location.href = '/dashboard'; // Using window.location for simplicity
      } else {
        // Handle unexpected status codes or non-JSON responses
        dispatch(loginFailure('Login failed: Unexpected response'));
      }
    } catch (error) {
      // Handle network errors or other exceptions
      dispatch(loginFailure(error|| 'Login failed'));
      console.log(error);
    }
  };
  

export const register = (username: string,  password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post<LoginResponse>(`${apiUrl}/register`, { username, password });
    dispatch(loginSuccess({ token: response.data.token }));
    localStorage.setItem('token', response.data.token);
    // Navigate to the dashboard
    window.location.href = '/dashboard'; // Using window.location for simplicity
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Registration failed'));
  }
};

export const performLogout = (): AppThunk => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
  // Navigate to the login page
  window.location.href = '/login'; // Using window.location for simplicity
};
