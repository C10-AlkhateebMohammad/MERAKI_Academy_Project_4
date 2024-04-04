import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import image1 from "../images/banner-3.png"
import { UserContext } from '../App';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
}));

const Product = () => {
  const { selectedCategory, setToken, token } = useContext(UserContext);
  const { products, setProducts } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { cart, setCart } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState('');
  const { cartItemsCount, setCartItemsCount } = useContext(UserContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/product`, { params: { categoryId: selectedCategory } })
      .then((res) => {
        console.log(res.data)
        setProducts(res.data.articles);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [selectedCategory]);

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem('token'); 
    console.log(token)
    if (token) {
      addToCart(productId, quantity[productId]);
    } else {
      navigate('/login');
    }
  };

  const addToCart = (productId, quantity) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/cart/add', {
      product: productId,
      quantity: quantity,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res) {
          console.log(res.data)
          setCart([...cart, res.data]);
          setCartItemsCount(cartItemsCount + quantity);
          alert('added has been sucsufully')

        } else {
          console.log('err');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleIncreaseQuantity = (productId,increaseAmount) => {
    setQuantity(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] || 0) + 1,
    }));
    addToCart(productId, increaseAmount);
  };

  const handleDecreaseQuantity = (productId) => {
    setQuantity(prevState => ({
      ...prevState,
      [productId]: Math.max((prevState[productId] || 0) - 1, 0),
    }));
  };

  const calculateTotalPrice = (productId) => {
    const product = products.find(product => product._id === productId);
    if (!product) return 0;
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    return price * (quantity[productId] || 0);
  };

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }

  return (
    <div className='mo'>
      {loginMessage && <p>{loginMessage}</p>}
      <div style={{ position: 'relative', textAlign: 'left' }}>
        <img src={image1} alt="error" style={{ width: '100%', height: '350px' }} />
        <div style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translate(0, -50%)', color: 'black' }}>
          <h1>
            <span style={{ display: 'block' }}>New winter</span>
            <span style={{ display: 'block' }}>collection 2024</span>
          </h1>
          <Button variant="contained" component={Link} to="/winter" color="primary" style={{ marginTop: '20px' }}>Shop Now</Button>
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <StyledPaper>
                {product.images.map((image, imgIndex) => (
                  <img key={imgIndex} src={image} alt={`Image ${imgIndex}`} style={{ width: '200px', height: '200px' }} />
                ))}
                <h2>{product.Name}</h2>
                <p>Price: {product.price}</p>
                <p>Brand: {product.brand}</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button variant="outlined" onClick={() => handleDecreaseQuantity(product._id)}>-</Button>
                  <input type="text" value={quantity[product._id] || 0} readOnly style={{ width: '30px', textAlign: 'center' }} />
                  <Button variant="outlined" onClick={() => handleIncreaseQuantity(product._id)}>+</Button>
                </div>
                <Button variant="contained" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
                <p>Total Price: {calculateTotalPrice(product._id)}</p>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoawp_NgrvQfGLwv04PfDqhzSiMeGzIBlMVA8OlXx4NBlhMV310JqYTbLJdNpHbNgjjMo&usqp=CAU" alt="error" style={{ width: '100%', height: '350px' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>
          <h1>EXCLUSIVE OFFERS FOR YOU</h1>
          <h1>online on best sellers product</h1>
          <Button variant="contained" color="primary" component={Link}
            to="/bestproduct">Click me</Button>
        </div>
      </div>
      <Box sx={{ backgroundColor: '#f5f5f5', padding: '50px 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
        <p style={{ color: '#666', marginBottom: '40px' }}>We'd love to hear from you! Reach out to us for any inquiries or assistance.</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ marginRight: '20px' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Phone</h3>
            <p style={{ color: '#666' }}>079-872-0341</p>
          </div>
          <div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Email</h3>
            <p style={{ color: '#666' }}>mohammed199761@yahoo.com</p>
          </div>
        </div>
        <Button variant="contained" color="primary" component={Link} to="/contact" style={{ textDecoration: 'none' }}>Contact Now</Button>
      </Box>
    </div>
  );
};

export default Product;