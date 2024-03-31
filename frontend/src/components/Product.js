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
import { Token } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
}));

const Product = () => {
  const { selectedCategory, setToken, token } = useContext(UserContext);
console.log(token)
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setproduct] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [cart, setCart] = useState('')
  const navigate = useNavigate();
const { cartItemsCount , setCartItemsCount }=useContext(UserContext)
  useEffect(() => {
    axios.get(`http://localhost:5000/product`, { params: { categoryId: selectedCategory } })
      .then((res) => {
        setProducts(res.data.articles.resuilt);
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
    axios.post('http://localhost:5000/cart/add', { product: productId, quantity: quantity }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log("res",res)
        if (res) {
          setproduct(res.data.message)
          console.log(res.data)
setCartItemsCount(cartItemsCount+1)
        } else {
          console.log('err')

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
                <Button variant="contained" onClick={() => {
                  console.log("test2")
                  handleAddToCart(product._id)
                }
                }
                >Add to Cart</Button>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>

    </div>
  );
};

export default Product;