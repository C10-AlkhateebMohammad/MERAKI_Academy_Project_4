import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
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
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
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
      addToCart(productId, quantity);
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
          setCartItemsCount(cartItemsCount + 1);

        } else {
          console.log('err');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (error) {
    return <p>Error fetching products: {error}</p>;
  }


  return (
    <div className='mo'>
      {loginMessage && <p>{loginMessage}</p>}
      <img src="https://i.pinimg.com/736x/c7/c2/a4/c7c2a4dbf099987918458d496da246c9.jpg" alt="Description of your image" style={{ width: '100%', height: '50' }} />
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
                <Button variant="contained" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>

      </Box>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoawp_NgrvQfGLwv04PfDqhzSiMeGzIBlMVA8OlXx4NBlhMV310JqYTbLJdNpHbNgjjMo&usqp=CAU" alt="Description of your image" style={{ width: '100%', height: 'auto' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black' }}>
          <h1>EXCLUSIVE OFFERS FOR YOU</h1>
          <h1>online on best sellers product</h1>
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