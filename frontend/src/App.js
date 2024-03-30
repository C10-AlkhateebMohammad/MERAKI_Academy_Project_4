import React, { useState, useEffect } from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import axios from 'axios';
import Product from './components/Product';
import { createContext } from 'react';

export const UserContext=createContext()
const App = () => {
const [product, setProduct] = useState([])
 
return (
  <UserContext.Provider value={{product, setProduct}}>
    <div className="App">
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Product />} />
            
        </Routes>
      </main>
    </div>
  </UserContext.Provider>
);
}

export default App
