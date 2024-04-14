import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'; 
import '../App.css'

function Login() {
  const { setLogin, setToken } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const log = () => {
    axios.post('http://localhost:5000/users/login', { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setSuccess('Login successfully');
        setError('');
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
        setError('Invalid email or password');
        setSuccess('');
      });
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h2>Login</h2>
        <div className='input-container'>
          <FaEnvelope className='input-icon' />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <FaLock className='input-icon' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='login-btn' onClick={log}>Login</button>
        {error && <p className='error-msg'>{error}</p>}
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;