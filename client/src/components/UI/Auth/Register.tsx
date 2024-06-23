import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { register } from '../../../slices/authActions';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  // const [name, setName] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    dispatch(register( username, password));
  };

  return (
    <div>
      <h1>Register</h1>
      <input 
        type="text" 
        placeholder="Name" 
        value={username} 
        onChange={(e) => setusername(e.target.value)} 
      />
      {/* <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      /> */}
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister} disabled={isLoading}>Register</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default RegisterPage;
