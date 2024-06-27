import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../../slices/authSlice';
import  educationbg from '../../../assets/illuctration/education-concept-illustration.png';
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
    <div className='flex  justify-center items-center h-screen bg-gray-100 p-14'>
      <div className='flex justify-between bg-white  rounded-md shadow-lg  ' >
      <div>
        <img src={educationbg} alt=" " className='w-96 h-96' />
      </div>
<form onSubmit={handleSubmit} className='bg-white px-20 py-20  rounded shadow-lg shadow-white-600 '>
      <h1 className='text-2xl font-bold text-center mb-3 bg-blue-700 p-3  text-white '>School Ms Login</h1>
      <label htmlFor="email">Email or Username</label><br />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Name' className='border border-gray-800 rounded-md p-2 mb-3' />
      <br />
      <label htmlFor="password">Password</label><br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' className='border border-gray-800 rounded-md p-2' />
      <br />
      <button type="submit" className='bg-red-600 text-white p-2 rounded-md mt-4 font-semibold'>Login</button>
    </form>
      </div>
     
    </div>
    
  );
};

export default Login;
