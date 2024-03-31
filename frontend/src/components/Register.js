import axios from 'axios';
import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [registerMessage, setRegisterMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const registration = () => {
    axios.post('http://localhost:5000/users/register', { firstName, lastName, age, email, password, country })
      .then((res) => {
        setRegisterMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setRegisterMessage("Failed to register. Please try again.");
      });
  }

  return (
    <div className='Reg'>
      <label>Register</label>
      <input type='text' placeholder='First Name' onChange={(e) => { setFirstName(e.target.value) }} />
      <input type='text' placeholder='Last Name' onChange={(e) => { setLastName(e.target.value) }} />
      <input type='number' placeholder='Age' onChange={(e) => { setAge(e.target.value) }} />
      <input type='text' placeholder='Country' onChange={(e) => { setCountry(e.target.value) }} />
      <input type='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
      <input type='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
      <button onClick={registration}>Submit</button>
      <h1>{registerMessage}</h1>
    </div>
  );
}

export default Register;