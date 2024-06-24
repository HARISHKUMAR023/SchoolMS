import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../../slices/authSlice';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // const data = await response.json();
      const { token } = data;
      console.log(data);
      dispatch(login({ token }));
     
      localStorage.setItem('token', data.token);
      // Redirect to dashboard or appropriate page
       navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex items-center justify-center  h-screen'>
<form onSubmit={handleSubmit} className='bg-white p-10 py-20 rounded shadow-lg shadow-amber-600'>
      <label htmlFor="email">Email or Username</label><br />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border border-fuchsia-500' />
      <br />
      <label htmlFor="password">Password</label><br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit" className='bg-red-500 text-white p-2 rounded-sm mt-4 font-semibold'>Login</button>
    </form>
    </div>
    
  );
};

export default Login;
