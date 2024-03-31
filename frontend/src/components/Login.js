import React, { useContext,useState } from 'react'
import { UserContext } from '../App'
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
function Login({ token }) {
    const { login,setLogin,setToken }=useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();
    const log = () => {
        axios.post('http://localhost:5000/users/login', { email, password })
          .then((response) => {
            localStorage.setItem("token",response.data.token)
            setToken(response.data.token); 
    
            navigate('/')
            setLogin(response.data.message)
               })
          .catch((error) => {
            console.error('Login error:', error);
          });
      };
    
      
    
      return (
        <div className='login'>
          <div className='mm'>
            <input
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={()=>{
                log()
            }}>Login</button>
          </div>
        </div>
      );
    }
export default Login