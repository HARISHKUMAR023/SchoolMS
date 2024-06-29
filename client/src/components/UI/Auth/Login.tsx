import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../slices/authSlice';
import educationbg from '../../../assets/illuctration/education-concept-illustration.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clsx from "clsx";

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]); // Declare meteorStyles state

  useEffect(() => {
    
    const screenWidth = window.innerWidth-350;
    const styles = [...new Array(20)].map(() => ({ // Default number of meteors is 20
      top: -5, // Start above the screen
      left: Math.floor(Math.random() * screenWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s", // Adjust duration based on screen height
    }));
    setMeteorStyles(styles);
  }, []); // Empty dependency array means this effect runs once on component mount

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', { email, password });
      const { token } = data;
      dispatch(login({ token }));
      localStorage.setItem('token', data.token);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warning(error.response?.data.message || 'An error occurred');
      } else {
        toast.error((error as Error).message);
      }
      console.error(error);
    }
  };

  return (
    <>
      {meteorStyles.map((style, idx) => ( // Use meteorStyles state to map and render meteors
        <span
          key={idx}
          className={clsx(
            " pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="overflow-y-clip pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-blue-700 to-transparent" />
        </span>
      ))}

      {/* Top div on top of all other content */}
      <div id='topdiv' className="z-50 flex justify-center items-center h-screen  p-14 absolute top-0 left-0 right-0 bottom-0">
        <ToastContainer />
        <div className="flex justify-between bg-blue-600/10 filter backdrop-blur-sm rounded-md shadow-lg">
          <div>
            <img src={educationbg} alt="Education Illustration" className="w-96 h-96" />
          </div>
          <form onSubmit={handleSubmit} className=" px-20 py-20 rounded ">
            <h1 className="text-2xl font-bold text-center mb-3  p-3 text-blue-700">School MS Login</h1>
            <label htmlFor="email">Email or Username</label><br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="outline-none mt-2 border-b bg-white/70 rounded-t-md border-blue-600 focus:border-b-[1.5px] p-2 mb-3 w-full"
            /><br />
            <label htmlFor="password mt-2">Password</label><br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="outline-none mt-2 border-b bg-white/70 to-transparent rounded-t-md border-blue-600 focus:border-b-[1.5px] p-2 w-full"
            /><br />
            <div className='flex gap-2'>
            <button type='submit' className='hover:bg-red-600 hover:text-white border-2 text-red-600 border-red-600 p-2 rounded-md mt-4 font-semibold w-full'>SignUp</button>  
            <button type="submit" className="bg-red-600/80 hover:bg-red-600 text-white p-2 rounded-md mt-4 font-semibold w-full">
              Login
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
