import React, { useState, useEffect } from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import axios from 'axios';
const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/product")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
      
    <div className="App">
   <Routes>
   <Route path='/' element={<NavBar />} />
      <Route path='/register' element={<Register products={products}/>}/> 
   </Routes>
  </div>
  )
}

export default App
