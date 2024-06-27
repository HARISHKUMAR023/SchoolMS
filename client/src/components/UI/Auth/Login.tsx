import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../slices/authSlice';
import educationbg from '../../../assets/illuctration/education-concept-illustration.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', { email, password });
      const { token } = data;
      console.log(data);
      dispatch(login({ token }));
      localStorage.setItem('token', data.token);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Error is an AxiosError
        toast.warning(error.response?.data.message || 'An error occurred');
      } else {
        // Error is a general error
        toast.error((error as Error).message);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-14">
      <ToastContainer />
      <div className="flex justify-between bg-white rounded-md shadow-lg">
        <div>
          <img src={educationbg} alt="Education Illustration" className="w-96 h-96" />
        </div>
        <form onSubmit={handleSubmit} className="bg-white px-20 py-20 rounded shadow-lg shadow-white-600">
          <h1 className="text-2xl font-bold text-center mb-3 bg-blue-700 p-3 text-white">School MS Login</h1>
          <label htmlFor="email">Email or Username</label><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-800 rounded-md p-2 mb-3 w-full"
          /><br />
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-800 rounded-md p-2 w-full"
          /><br />
          <button type="submit" className="bg-red-600 text-white p-2 rounded-md mt-4 font-semibold w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
