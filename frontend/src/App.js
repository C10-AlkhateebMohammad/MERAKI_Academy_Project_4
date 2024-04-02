import React, { useState, useEffect } from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from './components/Register';
import axios from 'axios';
import Product from './components/Product';
import { createContext } from 'react';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import ContactUs from './components/ContactUs';
export const UserContext=createContext()
const App = () => {
const [product, setProduct] = useState([])
const [selectedCategory, setselectedCategory] = useState()
const [cartItemsCount, setCartItemsCount] = React.useState(0);
const [login, setLogin] = useState()
const tokenStoreg=localStorage.getItem("token")
const [token, setToken] = useState(localStorage.getItem("token")||null)
const [products, setProducts] = useState([]);
const [searchQuery, setSearchQuery] = useState('')

return (
  <UserContext.Provider value={{product, setProduct,selectedCategory,setselectedCategory,cartItemsCount,setCartItemsCount,login,setLogin,token,setToken,products,setProducts,searchQuery,setSearchQuery}}>
    <div className="App">
        <header>
          <NavBar/>
        </header>

        <main>
          <Routes>
          <Route path='/login' element={<Login />}/>
            <Route path="/" element={<Product />} />
            <Route path='/register' element={<Register/> ? <Register/> : <NavBar/>}/>
            <Route path='/alladdproduct' element={<Addproduct/>}/>
            <Route path='/contact' element={<ContactUs/>}/>
          </Routes>
        </main>
      </div>
  </UserContext.Provider>
);
}

export default App